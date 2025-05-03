import { OrderBuilder } from "../model/builders/Order.builder";
import { IOrder } from "../model/IOrder";
import { IMapper } from "./IMapper";
import { IItem } from "../model/IItem";

export class CSVOrderMapper implements IMapper<string[], IOrder> {

    constructor(private itemMapper: IMapper<string[], IItem>) {            
    }

    map(data: string[]) : IOrder{
        const item:IItem = this.itemMapper.map(data);

        return OrderBuilder.newBuilder()
            .setOrderId(data[0])
            .setItem(item)
            .setQuantity(parseInt(data[data.length - 1]))
            .setPrice(parseFloat(data[data.length - 2]))
            .build();

    }

    // map(data: string[]): Order {
    //     return OrderBuilder.newBuilder()
    //         .setOrderId(data[0])
    //         .setCustomerName(data[1])
    //         .setCustomerEmail(data[2])
    //         .setCustomerPhone(data[3])
    //         .setDeliveryAddress(data[4])
    //         .setDeliveryDate(new Date(data[5]))
    //         .setDeliveryTime(data[6])
    //         .setPaymentMethod(data[7])
    //         .setTotalAmount(parseFloat(data[8]))
    //         .setStatus(data[9])
    //         .build();
    // }
}