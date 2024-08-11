import { IsIn, IsInt, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateOrderRequest {
    @IsInt() @Min(1) @Max(10)
    userId: number;

    @IsString()  @IsIn(['buy', 'sell'])
    orderType: string;

    @IsString() @IsIn(['BTC', 'ETH'])
    currencySymbol: string;

    @IsNumber({ maxDecimalPlaces: 6 }) @Min(1.123456) @Max(9.123456)
    price: string;
    
    quantity: number;
}