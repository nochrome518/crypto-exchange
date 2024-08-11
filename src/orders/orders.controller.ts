import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderRequest } from 'src/models/requests/create-order.request';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {

    constructor(private orderService: OrdersService ){ }

    @Post('create')
	async createOrder(@Body() createOrderRequest: CreateOrderRequest): Promise<any> {
		return this.orderService.createOrder(createOrderRequest);
	}

}
