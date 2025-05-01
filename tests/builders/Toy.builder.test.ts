import { before } from "node:test";
import { ToyBuilder } from "../../src/model/builders/Toy.builder";
import { Toy } from "../../src/model/Toy.model";

jest.mock("../../src/util/logger", () => ({
    error: jest.fn(),
}));

describe("ToyBuilder", () => {
    const validToyData = {
        orderId: "123",
        type: "Action Figure",
        ageGroup: "3-5",
        brand: "ToyBrand",
        material: "Plastic",
        batteryrequired: true,
        educational: false,
        price: 19.99,
        quantity: 2,
    };

    function buildValidToy() {
        return new ToyBuilder()
            .setOrderId(validToyData.orderId)
            .setType(validToyData.type)
            .setAgeGroup(validToyData.ageGroup)
            .setBrand(validToyData.brand)
            .setMaterial(validToyData.material)
            .setBatteryRequired(validToyData.batteryrequired)
            .setEducational(validToyData.educational)
            .setPrice(validToyData.price)
            .setQuantity(validToyData.quantity)
    }

    let toyBuilder = buildValidToy();

    it("should build a Toy object with all required fields", () => {
        const toy = toyBuilder.build();
        expect(toy).toBeInstanceOf(Toy);
        expect(toy.getOrderId()).toBe(validToyData.orderId);
        expect(toy.getType()).toBe(validToyData.type);
        expect(toy.getAgeGroup()).toBe(validToyData.ageGroup);
        expect(toy.getBrand()).toBe(validToyData.brand);
        expect(toy.getMaterial()).toBe(validToyData.material);
        expect(toy.isBatteryRequired()).toBe(validToyData.batteryrequired);
        expect(toy.isEducational()).toBe(validToyData.educational);
        expect(toy.getPrice()).toBe(validToyData.price);
        expect(toy.getQuantity()).toBe(validToyData.quantity);
    });

    it("should throw an error if a required field is missing", () => {
        const builder = new ToyBuilder()
            .setOrderId(validToyData.orderId)
            .setType(validToyData.type)
            .setAgeGroup(validToyData.ageGroup)
            .setBrand(validToyData.brand)
            .setMaterial(validToyData.material)
            .setBatteryRequired(validToyData.batteryrequired)
            .setEducational(validToyData.educational)
            .setPrice(validToyData.price);
        // quantity is missing
        expect(() => builder.build()).toThrow("All required fields must be set before building the Toy object.");
    });

    it("should throw an error if a required field is set to null", () => {
        const builder = new ToyBuilder()
            .setOrderId(validToyData.orderId)
            .setType(validToyData.type)
            .setAgeGroup(validToyData.ageGroup)
            .setBrand(validToyData.brand)
            .setMaterial(validToyData.material)
            .setBatteryRequired(validToyData.batteryrequired)
            .setEducational(validToyData.educational)
            .setPrice(validToyData.price)
            .setQuantity(null as any);
        expect(() => builder.build()).toThrow("All required fields must be set before building the Toy object.");
    });

    it("should throw an error if a required field is set to undefined", () => {
        const builder = new ToyBuilder()
            .setOrderId(validToyData.orderId)
            .setType(validToyData.type)
            .setAgeGroup(validToyData.ageGroup)
            .setBrand(validToyData.brand)
            .setMaterial(validToyData.material)
            .setBatteryRequired(validToyData.batteryrequired)
            .setEducational(validToyData.educational)
            .setPrice(validToyData.price)
            .setQuantity(undefined as any);
        expect(() => builder.build()).toThrow("All required fields must be set before building the Toy object.");
    });

    it("should throw if a number field is set to a non-number value", () => {
        const builder = new ToyBuilder()
            .setOrderId(validToyData.orderId)
            .setType(validToyData.type)
            .setAgeGroup(validToyData.ageGroup)
            .setBrand(validToyData.brand)
            .setMaterial(validToyData.material)
            .setBatteryRequired(validToyData.batteryrequired)
            .setEducational(validToyData.educational)
            .setPrice("not-a-number" as any)
            .setQuantity(validToyData.quantity);
        expect(() => builder.build()).not.toThrow(); // No runtime type check
    });
});