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
    });

    it("should throw an error if a required field is missing", () => {
        const builder = new ToyBuilder()
            .setOrderId(validToyData.orderId)
            .setType(validToyData.type)
            .setAgeGroup(validToyData.ageGroup)
            .setBrand(validToyData.brand)
            .setMaterial(validToyData.material)
            .setBatteryRequired(validToyData.batteryrequired)
            //Educational
        expect(() => builder.build()).toThrow("All required fields must be set before building the Toy object.");
    });

    it("should throw an error if a required field is set to null", () => {
        const builder = new ToyBuilder()
            .setOrderId(validToyData.orderId)
            .setType(validToyData.type)
            .setAgeGroup(validToyData.ageGroup)
            .setBrand(null as any) // Set to null
            .setMaterial(validToyData.material)
            .setBatteryRequired(validToyData.batteryrequired)
            .setEducational(validToyData.educational);
        expect(() => builder.build()).toThrow("All required fields must be set before building the Toy object.");
    });

    it("should throw an error if a required field is set to undefined", () => {
        const builder = new ToyBuilder()
            .setOrderId(validToyData.orderId)
            .setType(validToyData.type)
            .setAgeGroup(validToyData.ageGroup)
            .setBrand(undefined as any) // Set to undefined
            .setMaterial(validToyData.material)
            .setBatteryRequired(validToyData.batteryrequired)
            .setEducational(validToyData.educational);
        expect(() => builder.build()).toThrow("All required fields must be set before building the Toy object.");
    });
});