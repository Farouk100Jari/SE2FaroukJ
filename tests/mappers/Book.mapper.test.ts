import { JSONBookMapper } from "../../src/mappers/Book.mapper";

import { BookBuilder } from '../../src/model/builders/Book.builder';
import { Book } from '../../src/model/Book.model';

jest.mock("../../src/model/builders/Book.builder");

describe("JSONBookMapper", () => {
    let mapper: JSONBookMapper;

    beforeEach(() => {
        mapper = new JSONBookMapper();
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    it("should map JSON data to a Book instance correctly", () => {
        const data = {
            "Order ID": 123,
            "Book Title": "Test Title",
            "Author": "Test Author",
            "Genre": "Fiction",
            "Format": "Hardcover",
            "Language": "English",
            "Publisher": "Test Publisher",
            "Special Edition": true,
            "Packaging": "Boxed"
        };

        // Mock the builder chain
        const buildMock = jest.fn().mockReturnValue({ mock: "book" });
        const builderMock = {
            setOrderId: jest.fn().mockReturnThis(),
            setTitle: jest.fn().mockReturnThis(),
            setAuthor: jest.fn().mockReturnThis(),
            setGenre: jest.fn().mockReturnThis(),
            setFormat: jest.fn().mockReturnThis(),
            setLanguage: jest.fn().mockReturnThis(),
            setPublisher: jest.fn().mockReturnThis(),
            setSpecialEdition: jest.fn().mockReturnThis(),
            setPackaging: jest.fn().mockReturnThis(),
            build: buildMock
        };
        (BookBuilder.newBuilder as jest.Mock).mockReturnValue(builderMock);

        const result = mapper.map(data);

        expect(BookBuilder.newBuilder).toHaveBeenCalled();
        expect(builderMock.setOrderId).toHaveBeenCalledWith(123);
        expect(builderMock.setTitle).toHaveBeenCalledWith("Test Title");
        expect(builderMock.setAuthor).toHaveBeenCalledWith("Test Author");
        expect(builderMock.setGenre).toHaveBeenCalledWith("Fiction");
        expect(builderMock.setFormat).toHaveBeenCalledWith("Hardcover");
        expect(builderMock.setLanguage).toHaveBeenCalledWith("English");
        expect(builderMock.setPublisher).toHaveBeenCalledWith("Test Publisher");
        expect(builderMock.setSpecialEdition).toHaveBeenCalledWith(true);
        expect(builderMock.setPackaging).toHaveBeenCalledWith("Boxed");
        expect(buildMock).toHaveBeenCalled();
        expect(result).toEqual({ mock: "book" });
    });

    it("should handle missing fields gracefully", () => {
        const data = {};
        const buildMock = jest.fn().mockReturnValue({ mock: "book" });
        const builderMock = {
            setOrderId: jest.fn().mockReturnThis(),
            setTitle: jest.fn().mockReturnThis(),
            setAuthor: jest.fn().mockReturnThis(),
            setGenre: jest.fn().mockReturnThis(),
            setFormat: jest.fn().mockReturnThis(),
            setLanguage: jest.fn().mockReturnThis(),
            setPublisher: jest.fn().mockReturnThis(),
            setSpecialEdition: jest.fn().mockReturnThis(),
            setPackaging: jest.fn().mockReturnThis(),
            build: buildMock
        };
        (BookBuilder.newBuilder as jest.Mock).mockReturnValue(builderMock);

        const result = mapper.map(data);

        expect(builderMock.setOrderId).toHaveBeenCalledWith(undefined);
        expect(builderMock.setTitle).toHaveBeenCalledWith(undefined);
        expect(builderMock.setAuthor).toHaveBeenCalledWith(undefined);
        expect(builderMock.setGenre).toHaveBeenCalledWith(undefined);
        expect(builderMock.setFormat).toHaveBeenCalledWith(undefined);
        expect(builderMock.setLanguage).toHaveBeenCalledWith(undefined);
        expect(builderMock.setPublisher).toHaveBeenCalledWith(undefined);
        expect(builderMock.setSpecialEdition).toHaveBeenCalledWith(undefined);
        expect(builderMock.setPackaging).toHaveBeenCalledWith(undefined);
        expect(result).toEqual({ mock: "book" });
    });
});