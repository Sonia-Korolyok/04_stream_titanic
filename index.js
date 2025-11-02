import fs from 'node:fs';
import {
    calcAverageFareByClass,
    calcGroupStats,
    calcSurvivalStats,
    calcTotalFare,
} from "./model/titanic.js";
import * as readline from "node:readline";
import path from "node:path";
const __dirname = import.meta.dirname;


const filePath = path.join(__dirname, 'train.csv');

const CSV_REGEX = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

const stream = fs.createReadStream(filePath);
const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});
let header;
const results = [];
rl.on('line', (line) => {
    if (!header) {
        header = line.split(CSV_REGEX);
        return;
    }
    const row = line.split(CSV_REGEX);
    const obj = {};
    header.forEach((key, i) => {
        obj[key] = row[i];
    });
    results.push(obj);
});

rl.on('close', () => {
    console.log(`Total fares:`, calcTotalFare(results).toFixed(2));
    console.log(`Average fares by classes:`, calcAverageFareByClass(results))
    console.log(`Total survived:`, calcSurvivalStats(results));
    console.log(calcGroupStats(results));
});

