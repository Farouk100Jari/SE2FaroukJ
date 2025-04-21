import { promises as fs } from 'fs';
import { parse as csvParse } from 'csv-parse';
import { stringify as csvStringify } from 'csv-stringify';



//read  a csv file and returns its content as a 2D array of strings
//@param filePath - path to the csv file
//@param includeHeader - boolean to include header row or not
//@returns Promose<string[][]> - 2D array of strings
export async function readCsvFile(filePath: string,includeHeader: boolean=false): Promise<string[][]> {
    try{
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return new Promise((resolve, reject) => {
            csvParse(fileContent, { trim: true, skip_empty_lines: true }, (err, records: string[][]) => {
                if (err) reject(err);
                if (!includeHeader) records.shift(); // remove the header row if it exists
                resolve(records);
            });
        });
    }catch (error) {
        throw new Error(`Error reading CSV file: ${error}`);
    }
}

export async function writeCsvFile(filePath: string, data: string[][]): Promise<void> {
    try {
        const csvContent = await new Promise<string>((resolve, reject) => {
            csvStringify(data, (err, output) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            });
        });
        await fs.writeFile(filePath, csvContent, 'utf-8');
    } catch (error) {
        throw new Error(`Error writing CSV file: ${error}`);
    }
}