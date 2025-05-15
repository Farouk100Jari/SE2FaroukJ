import { Book } from "../Book.model";
import logger from '../../util/logger';

export class BookBuilder {
    private orderId!: string;
    private title!: string;
    private author!: string;
    private genre!: string;
    private format!: string;
    private language!: string;
    private publisher!: string;
    private specialEdition!: string;
    private packaging!: string;

    public static newBuilder(): BookBuilder {   
        return new BookBuilder();
    }

    setOrderId(orderId: string): BookBuilder {
        this.orderId = orderId;
        return this;
    }  

    setTitle(title: string): BookBuilder {
        this.title = title;
        return this;
    }

    setAuthor(author: string): BookBuilder {
        this.author = author;
        return this;
    }

    setGenre(genre: string): BookBuilder {
        this.genre = genre;
        return this;
    }

    setFormat(format: string): BookBuilder {
        this.format = format;
        return this;
    }

    setLanguage(language: string): BookBuilder {
        this.language = language;
        return this;
    }

    setPublisher(publisher: string): BookBuilder {
        this.publisher = publisher;
        return this;
    }

    setSpecialEdition(specialEdition: string): BookBuilder {
        this.specialEdition = specialEdition;
        return this;
    }

    setPackaging(packaging: string): BookBuilder {
        this.packaging = packaging;
        return this;
    }

    build(){
        const requiredFields = [
            this.orderId,
            this.title,
            this.author,
            this.genre,
            this.format,
            this.language,
            this.publisher,
            this.specialEdition,
            this.packaging
        ];

        const allFieldsSet = requiredFields.every(field => field !== undefined && field !== null);
        if (!allFieldsSet) {
            logger.error('All required fields must be set before building the Book object.');
            throw new Error('All required fields must be set before building the Book object.');
        }

        return new Book(
            this.orderId,
            this.title,
            this.author,
            this.genre,
            this.format,
            this.language,
            this.publisher,
            this.specialEdition,
            this.packaging
        );
    }
}