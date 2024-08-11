import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Consumer, ConsumerRunConfig, Kafka } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
	private readonly kafka = new Kafka({
        clientId: 'crypto-exchange',
		brokers: ['127.0.0.1:9092'],
    })
    private readonly consumers: Consumer[] = [];

    async consume(topics: string[], config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({ groupId: 'order-group' });
        await consumer.connect();

        for (const topic of topics) {
          	await consumer.subscribe({ topic, fromBeginning: true });
        }
    
        await consumer.run(config);
        this.consumers.push(consumer);
      }

    async onApplicationShutdown() {
        await Promise.all(this.consumers.map(consumer => consumer.disconnect()));
    }

}
