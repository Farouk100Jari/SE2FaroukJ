import { CakeBuilder } from '../../src/model/builders/Cake.builder';
import { Cake } from '../../src/model/Cake.model';

describe('CakeBuilder', () => {
    let builder: CakeBuilder;

    beforeEach(() => {
        builder = new CakeBuilder();
    });

    it('should build a Cake object when all required fields are set', () => {
        const cake = builder
            .setType('Birthday')
            .setFlavor('Vanilla')
            .setFilling('Strawberry')
            .setSize('Medium')
            .setLayers(2)
            .setFrostingType('Buttercream')
            .setFrostingFlavor('Vanilla')
            .setDecorationType('Sprinkles')
            .setDecorationColor('Rainbow')
            .setCustomMessage('Happy Birthday!')
            .setShape('Round')
            .setAllergies('None')
            .setSpecialIngredients('Organic Flour')
            .setPackagingType('Box')
            .build();

        expect(cake).toBeInstanceOf(Cake);
        expect(cake.getType()).toBe('Birthday');
        expect(cake.getFlavor()).toBe('Vanilla');
    });

    it('should throw an error if a required field is missing', () => {
        expect(() => {
            builder
                .setType('Birthday')
                .setFlavor('Vanilla')
                .setFilling('Strawberry')
                .setSize('Medium')
                .setLayers(2)
                .setFrostingType('Buttercream')
                .setFrostingFlavor('Vanilla')
                .setDecorationType('Sprinkles')
                .setDecorationColor('Rainbow')
                .setCustomMessage('Happy Birthday!')
                .setShape('Round')
                .setAllergies('None')
                .setSpecialIngredients('Organic Flour')
                // Missing packagingType
                .build();
        }).toThrow('All required fields must be set before building the Cake object.');
    });

    //add more tests for other fields as needed
    it('should throw an error if a required field is set to null', () => {
        expect(() => {
            builder
                .setType('Birthday')
                .setFlavor('Vanilla')
                .setFilling('Strawberry')
                .setSize('Medium')
                .setLayers(2)
                .setFrostingType('Buttercream')
                .setFrostingFlavor('Vanilla')
                .setDecorationType('Sprinkles')
                .setDecorationColor('Rainbow')
                .setCustomMessage('Happy Birthday!')
                .setShape('Round')
                .setAllergies(null as any) // Set to null
                .setSpecialIngredients('Organic Flour')
                .setPackagingType('Box')
                .build();
        }).toThrow('All required fields must be set before building the Cake object.');
    });

    it('should throw an error if a required field is set to undefined', () => {
        expect(() => {
            builder
                .setType('Birthday')
                .setFlavor('Vanilla')
                .setFilling('Strawberry')
                .setSize('Medium')
                .setLayers(2)
                .setFrostingType('Buttercream')
                .setFrostingFlavor('Vanilla')
                .setDecorationType('Sprinkles')
                .setDecorationColor('Rainbow')
                .setCustomMessage('Happy Birthday!')
                .setShape('Round')
                .setAllergies(undefined as any) // Set to undefined
                .setSpecialIngredients('Organic Flour')
                .setPackagingType('Box')
                .build();
        }).toThrow('All required fields must be set before building the Cake object.');
    });

});