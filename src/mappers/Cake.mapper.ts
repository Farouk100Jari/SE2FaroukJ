import { CakeBuilder } from "../model/builders/Cake.builder";
import { Cake } from "../model/Cake.model";
import { IMapper } from "./IMapper";

export class CSVCakeMapper implements IMapper<string[], Cake> {
    map(data: string[]): Cake {
        return CakeBuilder.newBuilder()
            .setType(data[0])
            .setFlavor(data[1])
            .setFilling(data[2])
            .setSize(data[3])
            .setLayers(parseInt(data[4]))
            .setFrostingType(data[5])
            .setFrostingFlavor(data[6])
            .setDecorationType(data[7])
            .setDecorationColor(data[8])
            .setCustomMessage(data[9])
            .setShape(data[10])
            .setAllergies(data[11])
            .setSpecialIngredients(data[12])
            .setPackagingType(data[13])
            .build();
    }
}