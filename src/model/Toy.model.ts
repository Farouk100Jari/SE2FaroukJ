import { Item, ItemCategory } from "./Item.model";

export class Toy implements Item {
    getCategory(): ItemCategory {
        return ItemCategory.TOY;
    }  

}