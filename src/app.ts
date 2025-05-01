//SOLID Principles

import logger from "./util/logger";

//Single Responsibility Principle (SRP)
//Open Closed Principle (OCP)
//Liskov Substitution Principle (LSP)
//Interface Segregation Principle (ISP)
//Dependency Inversion Principle (DIP)

export default interface Order{
    id:number,
    item:string,
    price:number
}


export class OrderManagement{

    private orders: Order[] =[];

    constructor(private validator : IValidator, private calculator: ICalculator){
   
    }

    getOrders(){
        return this.orders;
    }

    addOrder(item : string,price:number){

        try{
            const order: Order = {id:this.orders.length+1,item,price};
            this.validator.validate(order);
            this.orders.push(order);
        }catch(error : unknown){
            throw new Error(`OrderManagement: Error adding order: ${error}`);
        }
        
    }

    getOrder(id:number){
        const order = this.getOrders().find(order => order.id === id)
        if (!order){
            logger.warn(`OrderManagement: Order with ID ${id} not found`);
        }
        return order;
    }

    getTotalRevenue(){
        return this.calculator.getRevenue(this.getOrders());
    }

    getBuyPower(){
        return this.calculator.getAvgBuyPower(this.getOrders());
    }
}

export class PremiumOrderManagement extends OrderManagement{
    getOrder(id: number): Order | undefined {
        console.log("Alert: Premium Order");
        return super.getOrder(id);
    }
}

interface IValidator{
    validate(order:Order) : void;
}

interface IPossibleItems{
    getPossibleItems() : string[];
}

export class Validator implements IValidator{

    constructor(private rules:IValidator[]){}

    validate(order: Order): void {
        this.rules.forEach(rule => rule.validate(order));
    }
    
}

export class ItemValidator implements IValidator,IPossibleItems {
    getPossibleItems(): string[] {
        return ItemValidator.possibleItems;
    }

    private static possibleItems = [
        "Sponge",
        "Chocolate",
        "Fruit",
        "Red Velvet",
        "Birthday",
        "Carrot",
        "Marble",
        "Coffee",
    ];

    validate(order: Order): void {
        if (!ItemValidator.possibleItems.includes(order.item)) {
            throw new Error(`Invalid item. Must be one of: ${ItemValidator.possibleItems.join(", ")}`);
        }
    }
}

export class PriceValidator implements IValidator {
    validate(order: Order): void {
        if (order.price <= 0) {
            logger.error("PriceValidator: Price is negative");
            throw new Error("Price must be greater than zero");
        }
    }
}

export class MaxPriceValidator implements IValidator{
    validate(order:Order){
        if (order.price>100){
            throw new Error("Price must be less than 100");
        }
    }
}

interface ICalculator{
    getRevenue(orders:Order[]):number;
    getAvgBuyPower(orders:Order[]):number;
}

export class FinanceCalculator implements ICalculator{
    public getRevenue(orders:Order[]){
        return orders.reduce((total, order) => total + order.price, 0);
    }

    public getAvgBuyPower(orders : Order[]){
        return orders.length === 0 ? 0 : this.getRevenue(orders) / orders.length;
    }
}

