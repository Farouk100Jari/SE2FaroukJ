import * as fs from 'fs';

export class JSONParser {
    /**
     * Reads a JSON file and parses its content into a JavaScript object.
     * @param filePath - The path to the JSON file.
     * @returns The parsed JavaScript object.
     * @throws Will throw an error if the file cannot be read or the content is not valid JSON.
     */
    static parseJSONFile(filePath: string): object {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error:unknown) {
            throw new Error(`Failed to parse JSON file: ${error}`);
        }
    }
}

// Example usage:
// const jsonObject = JSONParser.parseJSONFile('./data.json');
// console.log(jsonObject);
