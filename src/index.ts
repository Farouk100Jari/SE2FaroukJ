import { readCsvFile } from "./parsers/csvParser";
import { JSONParser } from "./parsers/jsonParser";
import { CSVCakeMapper } from "./mappers/Cake.mapper";
import logger from "./util/logger";
import { CSVOrderMapper } from "./mappers/CSVOrder.mapper";
import { JSONBookMapper } from "./mappers/Book.mapper";
import { JSONOrderMapper } from "./mappers/JSONOrder.mapper";
import { XMLParser } from "./parsers/xmlParser";
import { ToyMapper } from "./mappers/Toy.mapper";
import { XMLOrderMapper } from "./mappers/XMLOrder.mapper";


async function main() {
    
    mapCakeData();
    mapBookData();
    mapToyData();

}

async function mapCakeData(){
    const cakeData = await readCsvFile('src/data/cake orders.csv');
    
    const cakemapper = new CSVCakeMapper();
    const orderMapper = new CSVOrderMapper(cakemapper);
    const cakes = cakeData.map(row => orderMapper.map(row));
    
    logger.info("List of Cake Orders: \n %o", cakes);
}

async function mapBookData(){
    const bookData = await JSONParser.parseJSONFile('src/data/book orders.json');

    const bookMapper = new JSONBookMapper();
    const booksOrderMapper = new JSONOrderMapper(bookMapper);

    // If you want to ensure bookData is always an array, you can handle it in the parser itself.
    // Here, we ensure bookData is an array of objects before mapping.
    const books = Array.isArray(bookData)
        ? bookData.map((row: any) => booksOrderMapper.map(row))
        : [];

    logger.info("List of Book Orders: \n %o", books);
}

async function mapToyData(){

    const toyData = await XMLParser.parseFile('src/data/toy orders.xml');

    const toyMapper = new ToyMapper(); // Assuming you have a mapper for XML as well
    const toyOrderMapper = new XMLOrderMapper(toyMapper);

    const toys = toyData.data.row.map((row: any) => toyOrderMapper.map(row));
    
    logger.info("List of Toy Orders: \n %o", toys);
}

main();