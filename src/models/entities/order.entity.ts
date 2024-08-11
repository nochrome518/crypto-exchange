import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enum/status.enum';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "user_id" })
    userId: number;

    @Column({ name: "order_type" })
    orderType: string;

    @Column({ name: "currency_symbol" })
    currencySymbol: string;

    @Column('decimal', { precision: 18, scale: 6 })
    price: number;

    @Column('decimal', { precision: 18, scale: 8 })
    quantity: number;

    @Column({ type: 'varchar', length: 50, default: Status.Open })
    status: Status;
    
}
