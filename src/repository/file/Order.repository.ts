import { InvalidItemException, ItemNotFoundException } from "../../util/exceptions/repositoryExceptions";
import { ID,id, IRepository } from "../IRepository";
import logger from "../../util/logger";
import { IOrder } from "../../model/IOrder";

export abstract class OrderRepository implements IRepository<IOrder>{

    protected abstract load(): Promise<IOrder[]> ;

    protected abstract save(orders:IOrder[]): Promise<void> ;

    async create(item: IOrder): Promise<id> {
        //validate the order
        if (!item) {
            logger.error("Invalid order item");
            throw new InvalidItemException("Invalid order item. Order cannot be null or undefined.");
        }
        //load all orders
        const orders = await this.load();
        //add the new order
        const id = orders.push(item);
        //save all orders
        await this.save(orders);
        logger.info("Order created successfully with ID: %o", id);
        //return the id of the new order
        return String(id); // Assuming ID is a string representation of the index
    }
    async get(id: id): Promise<IOrder> {
        const orders = await this.load();
        const order = orders.find(order => order.getId() === id);
        if (!order) {
            logger.error(`Order with ID ${id} not found`);
            throw new ItemNotFoundException(`Order with ID ${id} not found`);
        }
        logger.info(`Order with ID ${id} retrieved successfully`);
        return order;
    }
    async getAll(): Promise<IOrder[]> {
        logger.info("Retrieving all orders");
        return this.load();
    }
    async update(item: IOrder): Promise<void> {
        if (!item) {
            logger.error("Invalid order item");
            throw new InvalidItemException("Invalid order item. Order cannot be null or undefined.");
        }
        const orders = await this.load();
        const index = orders.findIndex(order => order.getId() === item.getId());
        if (index === -1) {
            logger.error(`Order with ID ${item.getId()} not found`);
            throw new ItemNotFoundException(`Order with ID ${item.getId()} not found`);
        }
        orders[index] = item;
        await this.save(orders);
    }
    async delete(id: id): Promise<void> {
        const orders = await this.load();
        const index = orders.findIndex(order => order.getId() === id);
        if (index === -1) {
            logger.error(`Order with ID ${id} not found`);
            throw new ItemNotFoundException(`Order with ID ${id} not found`);
        }
        orders.splice(index, 1);
        await this.save(orders);
        logger.info(`Order with ID ${id} deleted successfully`);
    }
    
}