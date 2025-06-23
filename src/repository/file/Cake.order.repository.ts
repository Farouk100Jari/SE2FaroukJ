import { OrderRepository } from "./Order.repository";
import { CSVOrderMapper } from "../../mappers/CSVOrder.mapper";
import { CSVCakeMapper } from "../../mappers/Cake.mapper";
import { readCsvFile, writeCsvFile } from "../../parsers/csvParser";
import { IOrder } from "../../model/IOrder";
import { DbException } from "../../util/exceptions/repositoryExceptions";

export class CakeOrderRepository extends OrderRepository {
    private mapper =new CSVOrderMapper(new CSVCakeMapper());
    constructor(private readonly filePath: string) {
        super();
    }

    protected async load(): Promise<IOrder[]> {

        try {
            //read 2D strings from the file
            const csv = await readCsvFile(this.filePath);

            //return the list of objects
            return csv.map(this.mapper.map.bind(this.mapper));
        } catch (error : unknown) {
            throw new DbException("Faile to load orders", error as Error);
        }
    }
    protected async save(orders: IOrder[]): Promise<void> {

        try {
            //generate the list of headers
            const header = ["order id", "cake id", "quantity", "price", "customer name", "customer address"];
            //const header = Object.keys(orders[0]).map(key => key.toLowerCase());
            
            //convert the orders to 2D strings
            const rawItems = orders.map(order => this.mapper.reverseMap(order));
            //const rawItems = orders.map(order => this.mapper.reverseMap.bind(this.mapper));

            //parse.write
            await writeCsvFile(this.filePath, [header, ...rawItems]);
        } catch (error : unknown) {
            throw new DbException("Faile to save order", error as Error);
        }
    }
}