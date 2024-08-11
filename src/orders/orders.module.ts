import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerService } from 'src/kafka/kafka.producer';
import { Balance } from 'src/models/entities/balance.entity';
import { Order } from 'src/models/entities/order.entity';
import { BalancesService } from 'src/services/balance.service';
import { CommonService } from 'src/utilities/common.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Balance])],
	controllers: [OrdersController],
	providers: [OrdersService, ProducerService, BalancesService, CommonService],
	exports: [OrdersService]
})
export class OrdersModule {}


