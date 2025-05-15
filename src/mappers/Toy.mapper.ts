import { Toy } from "../model/Toy.model";
import { ToyBuilder } from "../model/builders/Toy.builder";
import { IMapper } from "./IMapper";

export class ToyMapper implements IMapper<any, Toy> {
    map(data: any): Toy {
        return ToyBuilder.newBuilder()
            .setOrderId(data["OrderID"])
            .setType(data["Type"])
            .setMaterial(data["Material"])
            .setAgeGroup(data["AgeGroup"])
            .setBrand(data["Brand"])
            .setBatteryRequired(data["BatteryRequired"])
            .setEducational(data["Educational"])
            .build();
    }
}