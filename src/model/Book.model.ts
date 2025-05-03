import { IItem, ItemCategory } from "./IItem";

export class Book implements IItem {
    private orderId: string;
    private title: string;
    private author: string;
    private price: number;
    private genre: string;
    private format: string;
    private language: string;
    private publisher: string;
    private specialEdition: string;
    private packaging: string;
    private quantity: number;
    

    constructor(
        orderId: string,
        title: string,
        author: string,
        price: number,
        genre: string,
        format: string,
        language: string,
        publisher: string,
        specialEdition: string,
        packaging: string,
        quantity: number
    ) {
        this.orderId = orderId;
        this.title = title;
        this.author = author;
        this.price = price;
        this.genre = genre;
        this.format = format;
        this.language = language;
        this.publisher = publisher;
        this.specialEdition = specialEdition;
        this.packaging = packaging;
        this.quantity = quantity;
    }

    getCategory(): ItemCategory {
        return ItemCategory.BOOK;
    }

    getOrderId(): string {
        return this.orderId;

    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getPrice(): number {
        return this.price;
    }

    getGenre(): string {
        return this.genre;
    }

    getFormat(): string {
        return this.format;
    }

    getLanguage(): string {
        return this.language;
    }

    getPublisher(): string {
        return this.publisher;
    }

    getSpecialEdition(): string {
        return this.specialEdition;
    }

    getPackaging(): string {
        return this.packaging;
    }

    getQuantity(): number {
        return this.quantity;
    }
}