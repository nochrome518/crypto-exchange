import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/models/entities/order.entity';
import { CreateOrderRequest } from 'src/models/requests/create-order.request';
import { Repository } from 'typeorm';
import { Status } from 'src/models/enum/status.enum';
import { ProducerService } from 'src/kafka/kafka.producer';
import { OrderType } from 'src/models/enum/order-type.enum';
import { BalancesService } from 'src/services/balance.service';
import { CommonService } from 'src/utilities/common.service';

@Injectable()
export class OrdersService {

	constructor(
	  @InjectRepository(Order)
	  private ordersRepository: Repository<Order>,
	  private readonly producerService: ProducerService,
	  private readonly balancesService: BalancesService,
	  private commonService: CommonService
	) {}
    
	async createOrder(createOrderRequest: CreateOrderRequest): Promise<any> {
		console.log("==== request ====", createOrderRequest)
		//validating user balance
		if(createOrderRequest.orderType == OrderType.Sell){
			const balanceLedger = await this.balancesService.checkBalance(createOrderRequest.userId, createOrderRequest.currencySymbol);
			if(balanceLedger.balance < createOrderRequest.quantity){
				throw new HttpException(this.commonService.failureResponse(`Insufficiant Balance!`), HttpStatus.BAD_REQUEST) 
			}
		}

		//creating order
		let createOrder: Order = {...createOrderRequest} as any;
		const newOrder = await this.ordersRepository.save(createOrder);
		
		//producing order with Kafka
		await this.producerService.produce({
			topic: 'order-topic',
			messages: [{ value: JSON.stringify(newOrder) }],
		})
	
		return this.commonService.successResponse("Success");
	}

	async updateOrder(order: Order): Promise<void> {
		console.log("updating order...")
		const existingOrders = await this.ordersRepository
		.createQueryBuilder('order')
		.where('order.userId = :userId', { userId: order.userId })
		.andWhere('order.currencySymbol = :currencySymbol', { currencySymbol: order.currencySymbol })
		.andWhere('order.price = :price', { price: order.price })
		.andWhere('order.status = :status', { status: Status.Open })
		.andWhere('order.orderType = :orderType', { orderType: order.orderType })
		.orderBy('order.id', 'DESC')
		.take(2)
		.getMany();
		
		if(existingOrders.length === 2) {
			existingOrders[0].quantity += existingOrders[1].quantity;
			await this.ordersRepository.save(existingOrders[0]);
		}
	}
}
