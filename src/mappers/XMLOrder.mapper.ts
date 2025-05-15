import { OrderBuilder } from "../model/builders/Order.builder";
import { IOrder } from "../model/IOrder";
import { IMapper } from "./IMapper";
import { IItem } from "../model/IItem";

export class XMLOrderMapper implements IMapper<any, IOrder> {

    constructor(private itemMapper: IMapper<any, IItem>) {            
    }

    map(data: any) : IOrder{
        const item:IItem = this.itemMapper.map(data);

        return OrderBuilder.newBuilder()
            .setOrderId(data["OrderID"])
            .setItem(item)
            .setQuantity(parseInt(data["Quantity"]))
            .setPrice(parseFloat(data["Price"]))
            .build();
    }
}