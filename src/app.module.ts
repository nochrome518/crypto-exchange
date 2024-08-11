import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/entities/order.entity';
import { Balance } from './models/entities/balance.entity';
import { ConfigModule } from '@nestjs/config';
import { BalancesModule } from './services/balance.module';
import { KafkaConsumerService } from './services/kafka-consumer.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'mssql',
			host: process.env.HOST,
			port: Number(process.env.PORT),
			username: process.env.USER_NAME,
			password: process.env.PASSWORD,
			database: process.env.DATABASE,
			entities: [Order, Balance],
			synchronize: true,
			options: {
				trustServerCertificate: true,
			},
		  }),
		  OrdersModule,
		  BalancesModule,
		  KafkaModule
		],
	controllers: [AppController],
	providers: [AppService, KafkaConsumerService],
	exports: [KafkaConsumerService]
})
export class AppModule {}
