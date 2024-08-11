import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './kafka.producer';

@Module({
    providers: [ProducerService, ConsumerService],  // Add ProducerService here
    exports: [ProducerService, ConsumerService]
})
export class KafkaModule {}
