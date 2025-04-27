import { parseStringPromise } from 'xml2js';
import { promises as fs } from 'fs';

export class XMLParser {
    /**
     * Parses an XML file and converts it into a JavaScript object.
     * @param filePath - The path to the XML file to parse.
     * @returns A promise that resolves to the parsed object.
     */
    async parseFile(filePath: string): Promise<any> {
        try {
            const xmlString = await fs.readFile(filePath, 'utf-8'); // Read the file as a string

            if (!xmlString.trim()) {
                throw new Error('The XML file is empty');
            }

            const result = await parseStringPromise(xmlString, {
                explicitArray: false, // Avoid wrapping single elements in arrays
                mergeAttrs: true, // Merge attributes into the parent object
                trim: true, // Trim whitespace from text nodes
            });
            return result;
        } catch (error: any) {
            throw new Error(`Failed to parse XML file: ${error.message}`);
        }
    }
}

// Example usage:
// const parser = new XMLParser();
// parser.parseFile('path/to/your/file.xml').then(console.log).catch(console.error);