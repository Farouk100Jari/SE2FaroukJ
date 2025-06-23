import { IIdentifiableOrderItem } from "../../model/IOrder";
import { id, Initializable, IRepository } from "../IRepository";
import logger from "../../util/logger";
import { DbException, InitializationException } from "../../util/exceptions/repositoryExceptions";
import { ConnectionManager } from "./ConnectionManager";
import { IIdentifiableItem } from "../../model/IItem";
import { ISQLiteOrder, SQLiteCSVOrderMapper } from "../../mappers/CSVOrder.mapper";

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS "order" (
            id TEXT PRIMARY KEY,
            quantity INTEGER not NULL,
            price INTEGER not NULL,
            item_category TEXT not NULL,
            item_id TEXT not NULL
        )`;

const INSERT_ORDER = `INSERT INTO "order" (id, quantity, price, item_category, item_id) VALUES (?, ?, ?, ?, ?)`;

const SELECT_BY_ID = `SELECT * FROM "order" WHERE id = ?`;

const SELECT_ALL = `SELECT * FROM "order" where item_category = ?`;

const DELETE_BY_ID = `DELETE FROM "order" WHERE id = ?`;

const UPDATE_BY_ID = `UPDATE "order" SET quantity = ?, price = ? , item_category = ?, item_id = ? WHERE id = ?`;

export class OrderRepository implements IRepository<IIdentifiableOrderItem>,Initializable {
    constructor(private readonly itemRepository: IRepository<IIdentifiableItem> & Initializable) {
    }

    async init() {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.exec(CREATE_TABLE);
            this.itemRepository.init(); // Ensure item repository is initialized
            logger.info("Table order created successfully");
        } catch (error:unknown) {
            logger.error("Error creating table: %o", error as Error);
            throw new InitializationException("Error initializing the repository", error as Error);
        }
    }

    async create(order: IIdentifiableOrderItem): Promise<id> {
        //transaction
        let conn;
        try {
            conn = await ConnectionManager.getConnection();
            conn.exec("BEGIN TRANSACTION");
            const item_id = await this.itemRepository.create(order.getItem());

            conn.run(INSERT_ORDER, [
                order.getId(),
                order.getQuantity(),
                order.getPrice(),
                order.getItem().getCategory(),
                item_id
            ]);
            logger.info("Order created successfully with information: %o", order);
            conn.exec("COMMIT");
            return order.getId();

        } catch (error) {
            logger.error("Error creating order: %o", error as Error);
            conn && conn.exec("ROLLBACK");
            throw new DbException("Error creating the order", error as Error);
        }
    }
    async get(id: id): Promise<IIdentifiableOrderItem> {
        
        try {
            const conn = await ConnectionManager.getConnection();
            const result = await conn.get<ISQLiteOrder>(SELECT_BY_ID, id);
            if (!result) {
                logger.error("Order with ID %s not found", id);
                throw new Error(`Order with ID ${id} not found`);
            }
            const item = await this.itemRepository.get(result?.item_id); // Ensure the item exists
            logger.info("Order with ID %s retrieved successfully. Order : %o", id, result);
            return new SQLiteCSVOrderMapper().map({ data: result, item: item });

        } catch (error) {
            logger.error("Failed to get order of id %s: %o", id, error as Error);
            throw new DbException("Error getting the order", error as Error);
        }
    }
    async getAll(): Promise<IIdentifiableOrderItem[]> {
        try {
            const conn = await ConnectionManager.getConnection();
            const items = await this.itemRepository.getAll();
            if (items.length === 0) {
                return [];
            }
            const orders = await conn.all<ISQLiteOrder[]>(SELECT_ALL, items[0].getCategory());
            
            //bind orders to items
            const bindedOrders = orders.map(order => {
                const item = items.find(item => item.getId() === order.item_id);
                if (!item) {
                    logger.error("Item with ID %s not found for order %s", order.item_id, order.id);
                    throw new DbException(`Item with ID ${order.item_id} not found for order ${order.id}`,new Error("Item not found"));
                }
                return {order, item};
            });

            //for each binded order and item, map it into an identifiable order
            const mapper = new SQLiteCSVOrderMapper();
            const identifiableOrders = bindedOrders.map(({ order, item }) => {
                return mapper.map({ data: order, item });
            });

            //return list of identifiable orders
            return identifiableOrders;

        } catch (error) {
            logger.error("Failed to get all orders");
            throw new DbException("Error getting all orders", error as Error);
        }
    }
    async update(item: IIdentifiableOrderItem): Promise<void> {
        let conn;
        try {
            conn = await ConnectionManager.getConnection();
            conn.exec("BEGIN TRANSACTION");
            await this.itemRepository.update(item.getItem());

            await conn.run(UPDATE_BY_ID, [
                item.getQuantity(),
                item.getPrice(),
                item.getItem().getCategory(),
                item.getItem().getId(),
                item.getId()
                        ]);
            logger.info("Order with ID %s updated successfully", item.getId());
            conn.exec("COMMIT");

        } catch (error) {
            logger.error("Error deleting order with ID %s: %o", item.getId(), error as Error);
            conn && conn.exec("ROLLBACK");
            throw new DbException("Error deleting the order", error as Error);
        }
    }
    async delete(id: id): Promise<void> {
        let conn;
        try {
            conn = await ConnectionManager.getConnection();
            conn.exec("BEGIN TRANSACTION");
             await this.itemRepository.delete(id);

            await conn.run(DELETE_BY_ID, id);
            logger.info("Order with ID %s deleted successfully", id);
            conn.exec("COMMIT");

        } catch (error) {
            logger.error("Error deleting order with ID %s: %o", id, error as Error);
            conn && conn.exec("ROLLBACK");
            throw new DbException("Error deleting the order", error as Error);
        }
    }
}
