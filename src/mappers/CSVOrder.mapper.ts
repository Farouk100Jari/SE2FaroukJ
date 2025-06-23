import { IdentifiableOrderItemBuilder, OrderBuilder } from "../model/builders/Order.builder";
import { IIdentifiableOrderItem, IOrder } from "../model/IOrder";
import { IMapper } from "./IMapper";
import { IIdentifiableItem, IItem } from "../model/IItem";
import { IdentifiableOrderItem } from "model/Order.model";

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

    reverseMap(data: IOrder): string[] {
        return [
            data.getId(),
            ...this.itemMapper.reverseMap(data.getItem()),
            String(data.getQuantity()),
            String(data.getPrice())
        ]
    }
}

export interface ISQLiteOrder{
    id: string;
    quantity: number;
    price: number;
    item_category: string;
    item_id: string;
}

export class SQLiteCSVOrderMapper implements IMapper<{data:ISQLiteOrder,item:IIdentifiableItem}, IIdentifiableOrderItem> {

    map({data,item}: {data:ISQLiteOrder,item:IIdentifiableItem}) : IIdentifiableOrderItem{

        return IdentifiableOrderItemBuilder.newBuilder()
            .setItem(item)
            .setOrder(OrderBuilder.newBuilder()
                .setOrderId(data.id)
                .setQuantity(data.quantity)
                .setPrice(data.price)
                .setItem(item)
                .build())
            .build();

    }

    reverseMap(order: IdentifiableOrderItem): {data:ISQLiteOrder,item:IIdentifiableItem} {
        return {
            data: {
                id: order.getId(),
                quantity: order.getQuantity(),
                price: order.getPrice(),
                item_category: order.getItem().getCategory(),
                item_id: order.getItem().getId()
            },
            item: order.getItem()
        };
    }
}