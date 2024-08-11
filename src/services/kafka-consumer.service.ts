import { Injectable, OnModuleInit } from '@nestjs/common';;
import { ConsumerService } from 'src/kafka/consumer.service';
import { OrdersService } from '../orders/orders.service';
import { BalancesService } from './balance.service';

@Injectable() 
export class KafkaConsumerService implements OnModuleInit {

    constructor(
        private readonly ordersService: OrdersService,
        private readonly balancesService: BalancesService,
        private readonly consumerService: ConsumerService
    ) { }

    async onModuleInit() {
        try {
            await this.consumerService.consume(['order-topic'],{
                eachMessage: async ({ topic, partition, message }) => {
                    const order = JSON.parse(message.value.toString());
                    console.log("order at consumer",order)

                    await this.ordersService.updateOrder(order);
                    await this.balancesService.updateBalance(order);
                },
            })
        } catch(error) {
            console.log(error)
        }
    }
}
