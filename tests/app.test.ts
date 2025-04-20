import { afterEach, before } from "node:test";
import Order, {FinanceCalculator, OrderManagement, Validator} from "../src/app";

describe("OrderManagement", () => {

    //before all, new Validator and new FinanceCalculator
    //before each, new OrderManagement

    let orderManager: OrderManagement;
    let validator: Validator;
    let calculator: FinanceCalculator;
    let baseValidator:(order: Order) => void ;

    beforeAll(() => {
        validator = new Validator([]);
        calculator = new FinanceCalculator();
    });

    beforeEach(() => {
        baseValidator = validator.validate;
        validator.validate=jest.fn();
        orderManager = new OrderManagement(validator, calculator);
    });

    afterEach(()=>{
        validator.validate=baseValidator;
    });


    it("should add an order", () => {
        //Arrange
        const item = "Test Item";
        const price = 100;
        //Act
        orderManager.addOrder(item, price);
        //Assert
        expect(orderManager.getOrders()).toHaveLength(1);
        expect(orderManager.getOrders()[0].item).toBe("Test Item");
        expect(orderManager.getOrders()[0].price).toBe(100);
        expect(orderManager.getOrders()).toEqual([
            { id: 1, item: "Test Item", price: 100 }]);
    });

    it("should get an order", () => {
        //Arrange
        const item = "Test Item";
        const price = 100;
        orderManager.addOrder(item, price);
        //Act
        const order = orderManager.getOrder(1);
        //Assert
        expect(order).toEqual({ id: 1, item: "Test Item", price: 100 });
    });

    it("should call the finance calculator to getrevenue", () => {
        //Arrange
        const item = "Test Item";
        const price = 100;
        orderManager.addOrder(item, price);
        const spy = jest.spyOn(calculator, "getRevenue");
        //Act
         orderManager.getTotalRevenue();
        //Assert
        
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([{ id: 1, item, price }]);
        expect(spy).toHaveReturnedWith(100);
    }
    );

    it("should throw addition exceotion if validator doesnt pass", () => {
        //Arrange
        const item = "Test Item";
        const price = 100;
        (validator.validate as jest.Mock).mockImplementation(() => {
            throw new Error("Validation failed");
        });
        
        //Act and Assert
        expect(() => orderManager.addOrder(item, price)).toThrow("Validation failed");
    }
    );
});

describe("FinanceCalculator", () => {
  it("should get the total revenue", () => {
    //Arrange
    const orders = [
      { id: 1, item: "Test Item 1", price: 100 },
      { id: 2, item: "Test Item 2", price: 200 },
    ];
    const calculator = new FinanceCalculator();
    //Act
    const revenue = calculator.getRevenue(orders);
    //Assert
    expect(revenue).toBe(300);
  });

  it("should get the average buy power", () => {
    //Arrange
    const orders = [
      { id: 1, item: "Test Item 1", price: 100 },
      { id: 2, item: "Test Item 2", price: 200 },
    ];
    const calculator = new FinanceCalculator();
    //Act
    const buyPower = calculator.getAvgBuyPower(orders);
    //Assert
    expect(buyPower).toBe(150);
  });
});