import { CakeBuilder } from "./model/builders/Cake.builder";  
import { BookBuilder } from "./model/builders/Book.builder";
import { ToyBuilder } from "./model/builders/Toy.builder";


async function main() {

  const cake = new CakeBuilder()
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
    .setAllergies("Nuts")
    .setSpecialIngredients("Organic Eggs")
    .setPackagingType("Box")
    .build();

    console.log(cake); // Output: CAKE   
    
    const book = new BookBuilder()
    .setOrderId("1")
    .setTitle("The Great Gatsby")
    .setAuthor("F. Scott Fitzgerald")
    .setGenre("Fiction")
    .setFormat("Hardcover")
    .setLanguage("English")
    .setPublisher("Scribner")
    .setSpecialEdition("Collector's Edition")
    .setPackaging("Gift Wrap")
    .setPrice(29.99)
    .setQuantity(1)
    .build();

    console.log(book); // Output: BOOK

    const toy = new ToyBuilder()
    .setOrderId("2")
    .setType("Action Figure")
    .setAgeGroup("6-12 years")
    .setBrand("LEGO")
    .setMaterial("Plastic")
    .setBatteryRequired(false)
    .setEducational(true)
    .setPrice(19.99)
    .setQuantity(2)
    .build();

    console.log(toy); // Output: TOY
}

main();