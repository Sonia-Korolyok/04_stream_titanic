
import readline from "readline";
import fs from "fs";

export class Titanic {
    constructor(src, separator) {
        this.src = src;
        this.separator = separator;
    }

    totalFares() {
        const reader = readline.createInterface({
            input: fs.createReadStream('./train.csv', 'utf8'),
            crlfDelay: Infinity
        })
        let res = 0;
        let isFirstLine = true
        reader.on('line', data => {
            if (isFirstLine) {
                isFirstLine = false;
                return;
            }
            const cells = data.split(this.separator)
            res += cells[9] && +cells[9];
        })

        reader.on('close', () => {
            console.log(`Total fares:`, res.toFixed(2));
        })
    }

    avgFaresByClasses() {
        const reader = readline.createInterface({
            input: fs.createReadStream('./train.csv', 'utf8'),
            crlfDelay: Infinity
        })
        let res = {};
        let isFirstLine = true
        reader.on('line', data => {
            if (isFirstLine) {
                isFirstLine = false;
                return;
            }
            const cells = data.split(this.separator)
            if (cells[9]) {
                const info = {pClass: cells[2], fare: +cells[9]}
                const key = info.pClass;
                if (!res[key]) {
                    res[key] = [];
                }
                res[key].push(info.fare);
            }
        })

        reader.on('close', () => {
            for (const key in res) {
                res[key] = +(res[key].reduce((a, b) => a + b) / res[key].length).toFixed(2);
            }
            console.log(`Average fares by classes:`, res);
        })
    }

    totalSurvived() {
        const reader = readline.createInterface({
            input: fs.createReadStream('./train.csv', 'utf8'),
            crlfDelay: Infinity
        })
        let res = {};
        let isFirstLine = true
        reader.on('line', data => {
            if (isFirstLine) {
                isFirstLine = false;
                return;
            }
            const cells = data.split(this.separator)
            const key = +cells[1] ? 'Survived' : 'Non survived';
            if (!res[key]) {
                res[key] = 0;
            }
            res[key]++;
        })

        reader.on('close', () => {
            console.log(res);
        })
    }

    totalSurvivedByGender() {
        const reader = readline.createInterface({
            input: fs.createReadStream('./train.csv', 'utf8'),
            crlfDelay: Infinity
        })
        let res = {};
        let isFirstLine = true
        reader.on('line', data => {
            if (isFirstLine) {
                isFirstLine = false;
                return;
            }
            const cells = data.split(this.separator)
            const key = this._survivedGender(cells[4], cells[1]);
            if (!res[key]) {
                res[key] = 0;
            }
            res[key]++;
        })

        reader.on('close', () => {
            console.log(res);
        })
    }

    totalSurvivedChildren(){
        const reader = readline.createInterface({
            input: fs.createReadStream('./train.csv', 'utf8'),
            crlfDelay: Infinity
        })
        let res = {};
        let isFirstLine = true
        reader.on('line', data => {
            if (isFirstLine) {
                isFirstLine = false;
                return;
            }
            const cells = data.split(this.separator)
            if(cells[5] && cells[5] < 18) {
                const key = +cells[1] ? 'Children survived' : 'Children non survived';
                if (!res[key]) {
                    res[key] = 0;
                }
                res[key]++;
            }
        })

        reader.on('close', () => {
            console.log(res);
        })
    }

    showStats(){
        this.totalFares();
        this.avgFaresByClasses();
        this.totalSurvived();
        this.totalSurvivedByGender();
        this.totalSurvivedChildren();
    }

    _survivedGender(gender, survived) {
        survived = +survived ? 'survived' : 'non survived';
        return gender + " " + survived;
    }
}
