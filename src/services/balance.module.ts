import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from 'src/models/entities/balance.entity';
import { CommonService } from 'src/utilities/common.service';
import { BalancesService } from './balance.service';

@Module({
    imports: [TypeOrmModule.forFeature([Balance])],
	providers: [BalancesService, CommonService],
	exports: [BalancesService]
})
export class BalancesModule {}
