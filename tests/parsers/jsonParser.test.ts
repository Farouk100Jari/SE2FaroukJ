import * as fs from 'fs';
import * as path from 'path';
import { JSONParser } from '../../src/parsers/jsonParser';

describe('JSONParser', () => {
    const dataFolder = path.resolve(__dirname, '../../src/data');

    beforeAll(() => {
        // Ensure the data folder exists
        if (!fs.existsSync(dataFolder)) {
            fs.mkdirSync(dataFolder, { recursive: true });
        }
    });

    afterAll(() => {
        // Clean up test files
        const testFiles = ['valid.json', 'malformed.json', 'empty.json', 'xmlFile.xml'];
        testFiles.forEach(file => {
            const filePath = path.join(dataFolder, file);
            if (fs.existsSync(filePath)) {
                console.log(`Deleting file: ${filePath}`);
                fs.unlinkSync(filePath);
            }
        });
    });

    test('should correctly parse a valid JSON file', () => {
        const validFilePath = path.join(dataFolder, 'valid.json');
        const validJSON = { name: 'Test', age: 30 };
        fs.writeFileSync(validFilePath, JSON.stringify(validJSON));

        const result = JSONParser.parseJSONFile(validFilePath);
        expect(result).toEqual(validJSON);
    });

    test('should throw an error for a malformed JSON file', () => {
        const malformedFilePath = path.join(dataFolder, 'malformed.json');
        fs.writeFileSync(malformedFilePath, '{ name: "Test", age: 30 '); // Missing closing brace

        expect(() => JSONParser.parseJSONFile(malformedFilePath)).toThrow(
            'Failed to parse JSON file'
        );
    });

    test('should throw an error for an empty file', () => {
        const emptyFilePath = path.join(dataFolder, 'empty.json');
        fs.writeFileSync(emptyFilePath, '');

        expect(() => JSONParser.parseJSONFile(emptyFilePath)).toThrow(
            'Failed to parse JSON file'
        );
    });

    test('should throw an error for a non-JSON file (e.g., XML)', () => {
        const xmlFilePath = path.join(dataFolder, 'xmlFile.xml');
        const xmlContent = '<note><to>User</to><from>Tester</from></note>';
        fs.writeFileSync(xmlFilePath, xmlContent);

        expect(() => JSONParser.parseJSONFile(xmlFilePath)).toThrow(
            'Failed to parse JSON file'
        );
    });

    test('should throw an error if the file does not exist', () => {
        const nonExistentFilePath = path.join(dataFolder, 'nonExistent.json');

        expect(() => JSONParser.parseJSONFile(nonExistentFilePath)).toThrow(
            'Failed to parse JSON file'
        );
    });
});