import { XMLParser } from '../../src/parsers/xmlParser';
import { promises as fs } from 'fs';
import * as path from 'path';

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
    },
}));

describe('XMLParser', () => {
    const parser = new XMLParser();
    const dataFolder = path.resolve(__dirname, '../../src/data');

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should parse a valid XML file correctly', async () => {
        const mockXML = `<root><item id="1">Value</item></root>`;
        const expectedResult = { root: { item: { id: '1', _: 'Value' } } };
        const validFilePath = path.join(dataFolder, 'valid.xml');

        (fs.readFile as jest.Mock).mockResolvedValue(mockXML);

        const result = await parser.parseFile(validFilePath);
        expect(result).toEqual(expectedResult);
        expect(fs.readFile).toHaveBeenCalledWith(validFilePath, 'utf-8');
    });

    it('should throw an error for a malformed XML file', async () => {
        const mockMalformedXML = `<root><item id="1">Value</item>`;
        const malformedFilePath = path.join(dataFolder, 'malformed.xml');
        (fs.readFile as jest.Mock).mockResolvedValue(mockMalformedXML);

        await expect(parser.parseFile(malformedFilePath)).rejects.toThrow(
            'Failed to parse XML file'
        );
        expect(fs.readFile).toHaveBeenCalledWith(malformedFilePath, 'utf-8');
    });

    it('should throw an error for an empty XML file', async () => {
        const mockEmptyXML = '';
        const emptyFilePath = path.join(dataFolder, 'empty.xml');
        (fs.readFile as jest.Mock).mockResolvedValue(mockEmptyXML);

        await expect(parser.parseFile(emptyFilePath)).rejects.toThrow(
            'Failed to parse XML file'
        );
        expect(fs.readFile).toHaveBeenCalledWith(emptyFilePath, 'utf-8');
    });

    it('should handle XML with attributes and nested elements', async () => {
        const mockXML = `
            <root>
                <item id="1">
                    <subItem name="test">Value</subItem>
                </item>
            </root>`;
        const expectedResult = {
            root: {
                item: {
                    id: '1',
                    subItem: {
                        name: 'test',
                        _: 'Value',
                    },
                },
            },
        };
        const nestedFilePath = path.join(dataFolder, 'nested.xml');
        (fs.readFile as jest.Mock).mockResolvedValue(mockXML);

        const result = await parser.parseFile(nestedFilePath);
        expect(result).toEqual(expectedResult);
        expect(fs.readFile).toHaveBeenCalledWith(nestedFilePath, 'utf-8');
    });

    it('should throw an error if the file does not exist', async () => {
        const nonExistentFilePath = path.join(dataFolder, 'nonexistent.xml');
        (fs.readFile as jest.Mock).mockRejectedValue(new Error('ENOENT: no such file or directory'));

        await expect(parser.parseFile(nonExistentFilePath)).rejects.toThrow(
            'Failed to parse XML file: ENOENT: no such file or directory'
        );
        expect(fs.readFile).toHaveBeenCalledWith(nonExistentFilePath, 'utf-8');
    });
});