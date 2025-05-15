import { Toy } from "../Toy.model";
import logger from "../../util/logger";

export class ToyBuilder {
    private orderId!: string;
    private type!: string;
    private ageGroup!: string;
    private brand!: string;
    private material!: string;
    private batteryrequired!: boolean;
    private educational!: boolean;

    public static newBuilder(): ToyBuilder {   
        return new ToyBuilder();
    }

    setOrderId(orderId: string): ToyBuilder {
        this.orderId = orderId;
        return this;
    }

    setType(type: string): ToyBuilder {
        this.type = type;
        return this;
    }

    setAgeGroup(ageGroup: string): ToyBuilder {
        this.ageGroup = ageGroup;
        return this;
    }

    setBrand(brand: string): ToyBuilder {
        this.brand = brand;
        return this;
    }

    setMaterial(material: string): ToyBuilder {
        this.material = material;
        return this;
    }

    setBatteryRequired(batteryrequired: boolean): ToyBuilder {
        this.batteryrequired = batteryrequired;
        return this;
    }

    setEducational(educational: boolean): ToyBuilder {
        this.educational = educational;
        return this;
    }

    build(): Toy {
        const requiredFields = [
            this.orderId,
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryrequired,
            this.educational
        ];  

        const allFieldsProvided = requiredFields.every(field => field !== undefined && field !== null);
        if (!allFieldsProvided) {
            logger.error('All required fields must be set before building the Toy object.');
            throw new Error("All required fields must be set before building the Toy object.");
        }

        return new Toy(
            this.orderId,
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryrequired,
            this.educational
        );
    }
}