import { OrderRepository } from "./repository/sqlite/Order.repository";
import { CakeRepository } from "./repository/sqlite/Cake.order.repository";
import { CakeBuilder, IdentifiableCakeBuilder } from "./model/builders/Cake.builder";
import { IdentifiableOrderItemBuilder, OrderBuilder } from "./model/builders/Order.builder";
import logger from "./util/logger";
import { log } from "console";


async function DBSandBox() {
    const dbOrder = new OrderRepository(new CakeRepository());
    await dbOrder.init();
    
    const dbCake = new CakeRepository();
    await dbCake.init();

    //create identifiable cake
    const cake = CakeBuilder.newBuilder()
        .setType("Birthday Cake")
        .setFlavor("Chocolate")
        .setFilling("Vanilla Cream")
        .setSize("Large")
        .setLayers(3)
        .setFrostingType("Buttercream")
        .setFrostingFlavor("Chocolate")
        .setDecorationType("Sprinkles")
        .setDecorationColor("Rainbow")
        .setCustomMessage("Happy Birthday!")
        .setShape("Round")
        .setAllergies("None")
        .setSpecialIngredients("None")
        .setPackagingType("Boxed")
        .build();

    const indenCake = IdentifiableCakeBuilder.newBuilder()
        .setId("C" + Math.random().toString(36).substring(2, 15)) // Generate a random ID
        .setCake(cake)
        .build();


    const order = OrderBuilder.newBuilder()
        .setOrderId("O" + Math.random().toString(36).substring(2, 15)) // Generate a random ID
        .setItem(cake)
        .setQuantity(2)
        .setPrice(50)
        .build();

    const idenOrder = IdentifiableOrderItemBuilder.newBuilder()
        .setItem(indenCake)
        .setOrder(order)
        .build();

    await dbOrder.create(idenOrder);

    await dbOrder.delete(idenOrder.getId());

    console.log((await dbOrder.getAll()).length);
}

DBSandBox().catch(error => logger.error("Error in DBSandBox:", error));