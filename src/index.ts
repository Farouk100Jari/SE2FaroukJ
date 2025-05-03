import { readCsvFile } from "./parsers/csvParser";
import { CSVCakeMapper } from "./mappers/Cake.mapper";
import logger from "./util/logger";
import { CSVOrderMapper } from "./mappers/Order.mapper";


async function main() {
    const data = await readCsvFile('src/data/cake orders.csv');
    
    const cakemapper = new CSVCakeMapper();
    const orderMapper = new CSVOrderMapper(cakemapper);
    const cakes = data.map(row => orderMapper.map(row));
    
    logger.info("List of Orders: \n %o", cakes);
}

main();