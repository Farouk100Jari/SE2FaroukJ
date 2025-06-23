import { IIdentifiableItem, IItem } from "../../model/IItem";
import { IdentifiableOrderItem, Order } from "../../model/Order.model";

export class OrderBuilder {
    private orderId!: string;
    private item!: IItem;
    private price!: number;
    private quantity!: number;

    public static newBuilder(): OrderBuilder {   
        return new OrderBuilder();
    }

    setOrderId(orderId: string): OrderBuilder {
        this.orderId = orderId;
        return this;
    }  

    setItem(item: IItem): OrderBuilder {
        this.item = item;
        return this;
    }

    setPrice(price: number): OrderBuilder {
        this.price = price;
        return this;
    }

    setQuantity(quantity: number): OrderBuilder {
        this.quantity = quantity;
        return this;
    }

    build(): Order {
        const requiredFields = [this.orderId, this.item, this.price, this.quantity];

        if (requiredFields.some(field => field === undefined || field === null)) {
            throw new Error("Missing required fields to create Order.");
        }

        return new Order(this.orderId, this.item, this.price, this.quantity);
    }
}

export class IdentifiableOrderItemBuilder {
    private item!: IIdentifiableItem;
    private order!: Order;

    static newBuilder(): IdentifiableOrderItemBuilder {
        return new IdentifiableOrderItemBuilder();
    }

    setItem(item: IIdentifiableItem): IdentifiableOrderItemBuilder {
        this.item = item;
        return this;
    }

    setOrder(order: Order): IdentifiableOrderItemBuilder {
        this.order = order;
        return this;
    }

    build(): IdentifiableOrderItem {

        if (!this.item || !this.order) {
            throw new Error("Missing required fields to build IdentifiableOrderItem.");
        }

        return new IdentifiableOrderItem( this.item, this.order.getPrice(), this.order.getQuantity(),this.order.getId());   
    }
}