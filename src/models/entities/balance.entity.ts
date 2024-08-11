import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Balance {
  
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "user_id" })
	userId: number;

	@Column({ name: "currency_symbol" })
	currencySymbol: string;

	@Column('decimal', { precision: 18, scale: 8 })
	balance: number;
	
}
