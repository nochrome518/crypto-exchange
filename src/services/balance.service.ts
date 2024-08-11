import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/models/entities/order.entity';
import { OrderType } from 'src/models/enum/order-type.enum';
import { SearchBalanceBy } from 'src/models/types/common.types';
import { CommonService } from 'src/utilities/common.service';
import { Repository } from 'typeorm';
import { Balance } from '../models/entities/balance.entity';

export class BalancesService {
    constructor(
        @InjectRepository(Balance)
        private balancesRepository: Repository<Balance>,
        private commonService: CommonService
    ) {}

    async updateBalance(order: Order): Promise<void> {
        console.log("updating balance...")
        let searchBalanceBy: SearchBalanceBy = {} as any;
        searchBalanceBy.userId = order.userId;
        searchBalanceBy.currencySymbol = order.currencySymbol;
        const balanceLedger = await this.balancesRepository.findOne({ where: searchBalanceBy });

        //checking for new user
        if(!balanceLedger || balanceLedger == null){
            if(order.orderType === OrderType.Buy){
                const balance:  Balance = {
                    userId: order.userId,
                    currencySymbol: order.currencySymbol,
                    balance: order.quantity
                } as any;
                await this.balancesRepository.save(balance);

            } else {
               //new user can only perform buy operation only
               console.log(`Balance not found for user ${order.userId} and currency ${order.currencySymbol}`);
            }
        
        } else {
            //updating user balance
            if (order.orderType === OrderType.Buy) {
                balanceLedger.balance += order.quantity;
            } else if (order.orderType === OrderType.Sell) {
                balanceLedger.balance -= order.quantity;
            }
            await this.balancesRepository.save(balanceLedger);
        }
    }

    async checkBalance(userId: number, currencySymbol: string):Promise<any> {
        let searchBalanceBy: SearchBalanceBy = {} as any;
        searchBalanceBy.userId = userId;
        searchBalanceBy.currencySymbol = currencySymbol;
        const balanceLedger = await this.balancesRepository.findOne({ where: searchBalanceBy });
        if(!balanceLedger){
            throw new HttpException(this.commonService.failureResponse(`User balance not found!`), HttpStatus.BAD_REQUEST) 
        }
        return balanceLedger;
    }
}
