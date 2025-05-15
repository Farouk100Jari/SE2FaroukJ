import { BookBuilder } from "../model/builders/Book.builder";
import { Book } from "../model/Book.model";
import { IMapper } from "./IMapper";

export class JSONBookMapper implements IMapper<any, Book>{
    map(data: any): Book {
        
        return BookBuilder.newBuilder() 
            .setOrderId(data["Order ID"])
            .setTitle(data["Book Title"])
            .setAuthor(data["Author"])
            .setGenre(data["Genre"])
            .setFormat(data["Format"])
            .setLanguage(data["Language"])
            .setPublisher(data["Publisher"])
            .setSpecialEdition(data["Special Edition"])
            .setPackaging(data["Packaging"])
            .build();
    }
}