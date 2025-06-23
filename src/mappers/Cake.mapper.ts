import { CakeBuilder, IdentifiableCakeBuilder } from "../model/builders/Cake.builder";
import { Cake, IdentifiableCake } from "../model/Cake.model";
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

    reverseMap(data: Cake): string[] {
        return [
            data.getType(),
            data.getFlavor(),
            data.getFilling(),
            data.getSize(),
            String(data.getLayers()),
            data.getFrostingType(),
            data.getFrostingFlavor(),
            data.getDecorationType(),
            data.getDecorationColor(),
            data.getCustomMessage(),
            data.getShape(),
            data.getAllergies(),
            data.getSpecialIngredients(),
            data.getPackagingType()
        ];
    }
}

export interface ISQLiteCake {
    id: string;
    type: string;
    flavor: string;
    filling: string;
    size: string;
    layers: number;
    frostingType: string;
    frostingFlavor: string;
    decorationType: string;
    decorationColor: string;
    customMessage: string;
    shape: string;
    allergies: string;
    specialIngredients: string;
    packagingType: string;
}

export class SQLiteCakeMapper implements IMapper<ISQLiteCake,IdentifiableCake>{
    map(data: ISQLiteCake): IdentifiableCake {
        return IdentifiableCakeBuilder.newBuilder()
            .setId(data.id)
            .setCake(CakeBuilder.newBuilder()
                .setType(data.type)
                .setFlavor(data.flavor)
                .setFilling(data.filling)
                .setSize(data.size)
                .setLayers(data.layers)
                .setFrostingType(data.frostingType)
                .setFrostingFlavor(data.frostingFlavor)
                .setDecorationType(data.decorationType)
                .setDecorationColor(data.decorationColor)
                .setCustomMessage(data.customMessage)
                .setShape(data.shape)
                .setAllergies(data.allergies)
                .setSpecialIngredients(data.specialIngredients)
                .setPackagingType(data.packagingType)
                .build())
            .build();
    }

    reverseMap(data: IdentifiableCake): ISQLiteCake {
        return {
            id: data.getId(),
            type: data.getType(),
            flavor: data.getFlavor(),
            filling: data.getFilling(),
            size: data.getSize(),
            layers: data.getLayers(),
            frostingType: data.getFrostingType(),
            frostingFlavor: data.getFrostingFlavor(),
            decorationType: data.getDecorationType(),
            decorationColor: data.getDecorationColor(),
            customMessage: data.getCustomMessage(),
            shape: data.getShape(),
            allergies: data.getAllergies(),
            specialIngredients: data.getSpecialIngredients(),
            packagingType: data.getPackagingType()
        };
    }
}