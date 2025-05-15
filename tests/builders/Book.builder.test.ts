import { BookBuilder } from '../../src/model/builders/Book.builder';
import { Book } from '../../src/model/Book.model';

describe('BookBuilder', () => {
    const validBookData = {
        orderId: '123',
        title: 'Test Book',
        author: 'Author Name',
        genre: 'Fiction',
        format: 'Hardcover',
        language: 'English',
        publisher: 'Test Publisher',
        specialEdition: 'None',
        packaging: 'Box',
        price: 19.99,
        quantity: 5,
    };

    function buildValidBook() {
        return new BookBuilder()
            .setOrderId(validBookData.orderId)
            .setTitle(validBookData.title)
            .setAuthor(validBookData.author)
            .setGenre(validBookData.genre)
            .setFormat(validBookData.format)
            .setLanguage(validBookData.language)
            .setPublisher(validBookData.publisher)
            .setSpecialEdition(validBookData.specialEdition)
            .setPackaging(validBookData.packaging);
    }

    let bookBuilder: BookBuilder;
    beforeEach(() => {
        bookBuilder = buildValidBook();
    });

    it('should build a Book object when all required fields are set', () => {
        var book = bookBuilder.build();
        expect(book).toBeInstanceOf(Book);
        expect(book.getOrderId()).toBe(validBookData.orderId);
        expect(book.getTitle()).toBe(validBookData.title);
        expect(book.getAuthor()).toBe(validBookData.author);
        expect(book.getGenre()).toBe(validBookData.genre);
        expect(book.getFormat()).toBe(validBookData.format);
        expect(book.getLanguage()).toBe(validBookData.language);
        expect(book.getPublisher()).toBe(validBookData.publisher);
        expect(book.getSpecialEdition()).toBe(validBookData.specialEdition);
        expect(book.getPackaging()).toBe(validBookData.packaging);
    });

    it('should throw an error if a required field is missing', () => {

        // Remove one required field
        // @ts-expect-error
        bookBuilder['title'] = undefined;
        expect(() => bookBuilder.build()).toThrow('All required fields must be set before building the Book object.');
    });

    it('should throw an error if a required field is null', () => {

        // @ts-expect-error
        bookBuilder['author'] = null;
        expect(() => bookBuilder.build()).toThrow('All required fields must be set before building the Book object.');
    });
});