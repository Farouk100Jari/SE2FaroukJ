import { Cake, IdentifiableCake } from '../Cake.model';
import logger from '../../util/logger';

export class CakeBuilder {
    private type!: string;
    private flavor!: string;
    private filling!: string;
    private size!: string;
    private layers!: number;
    private frostingType!: string;
    private frostingFlavor!: string;
    private decorationType!: string;
    private decorationColor!: string;
    private customMessage!: string;
    private shape!: string;
    private allergies!: string;
    private specialIngredients!: string;
    private packagingType!: string;

    public static newBuilder(): CakeBuilder {   
        return new CakeBuilder();
    }

    setType(type: string): CakeBuilder {
        this.type = type;
        return this;
    }

    setFlavor(flavor: string): CakeBuilder {
        this.flavor = flavor;
        return this;
    }

    setFilling(filling: string): CakeBuilder {
        this.filling = filling;
        return this;
    }

    setSize(size: string): CakeBuilder {
        this.size = size;
        return this;
    }

    setLayers(layers: number): CakeBuilder {
        this.layers = layers;
        return this;
    }

    setFrostingType(frostingType: string): CakeBuilder {
        this.frostingType = frostingType;
        return this;
    }

    setFrostingFlavor(frostingFlavor: string): CakeBuilder {
        this.frostingFlavor = frostingFlavor;
        return this;
    }

    setDecorationType(decorationType: string): CakeBuilder {
        this.decorationType = decorationType;
        return this;
    }

    setDecorationColor(decorationColor: string): CakeBuilder {
        this.decorationColor = decorationColor;
        return this;
    }

    setCustomMessage(customMessage: string): CakeBuilder {
        this.customMessage = customMessage;
        return this;
    }

    setShape(shape: string): CakeBuilder {
        this.shape = shape;
        return this;
    }

    setAllergies(allergies: string): CakeBuilder {
        this.allergies = allergies;
        return this;
    }

    setSpecialIngredients(specialIngredients: string): CakeBuilder {
        this.specialIngredients = specialIngredients;
        return this;
    }

    setPackagingType(packagingType: string): CakeBuilder {
        this.packagingType = packagingType;
        return this;
    }

    build(): Cake {

        const requiredFields = [
            this.type,
            this.flavor,
            this.filling,
            this.size,
            this.layers,
            this.frostingType,
            this.frostingFlavor,
            this.decorationType,
            this.decorationColor,
            this.customMessage,
            this.shape,
            this.allergies,
            this.specialIngredients,
            this.packagingType];

        const allFieldsSet = requiredFields.every(field => field !== undefined && field !== null);
        if (!allFieldsSet) {
            logger.error('All required fields must be set before building the Cake object.');
            throw new Error('All required fields must be set before building the Cake object.');
        }

        return new Cake(
            this.type,
            this.flavor,
            this.filling,
            this.size,
            this.layers,
            this.frostingType,
            this.frostingFlavor,
            this.decorationType,
            this.decorationColor,
            this.customMessage,
            this.shape,
            this.allergies,
            this.specialIngredients,
            this.packagingType
        );    
    }
}

export class IdentifiableCakeBuilder  {
    private id!: string;
    private cake! : Cake;

    static newBuilder(): IdentifiableCakeBuilder {
        return new IdentifiableCakeBuilder();
    }

    setId(id: string): IdentifiableCakeBuilder {
        this.id = id;
        return this;
    }

    setCake(cake: Cake): IdentifiableCakeBuilder {
        this.cake = cake;
        return this;
    }

    build(): IdentifiableCake {
        if (!this.id || !this.cake) {
            logger.error('Both id and cake must be set before building the IdentifiableCake object.');
            throw new Error('Both id and cake must be set before building the IdentifiableCake object.');
        }
        return new IdentifiableCake(
            this.id,
            this.cake.getType(),
            this.cake.getFlavor(),
            this.cake.getFilling(),
            this.cake.getSize(),
            this.cake.getLayers(),
            this.cake.getFrostingType(),
            this.cake.getFrostingFlavor(),
            this.cake.getDecorationType(),
            this.cake.getDecorationColor(),
            this.cake.getCustomMessage(),
            this.cake.getShape(),
            this.cake.getAllergies(),
            this.cake.getSpecialIngredients(),
            this.cake.getPackagingType()
        );
    }
}