'use strict';

const DatabaseError = require('./databaseerror');
const Parser = require('./parser');

const generateId = require('./utils/generateId');
const loadJson = require('./utils/loadJson');
const saveJson = require('./utils/saveJson');

const showTable = require('./utils/showTable');

class Database {
    constructor() {
        this.newTable = {};
        this.parser = new Parser();
        this.contentTable = loadJson('db.json');
    }

    createTable(parsedComand) {
        let [, tableName, columns] = parsedComand;
        this.newTable[tableName] = {
            columns: {},
            data: []
        };

        columns = columns.split(", ");

        for (let column of columns) {
            column = column.split(" ");
            const [name, type] = column;
            this.newTable[tableName].columns[name] = type;
        };

        const tableData = JSON.stringify({ ...this.contentTable, ...this.newTable }, undefined, 4);
        saveJson('db.json', tableData);
    }

    insert(parsedComand) {
        let [, tableName, columns, values] = parsedComand;
        columns = columns.split(", ");
        values = values.split(", ");

        let row = {
            id: generateId()
        };

        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const value = values[i];
            row[column] = value
        }

        this.contentTable[tableName].data.push(row);

        const tableData = JSON.stringify(this.contentTable, undefined, 4);
        saveJson('db.json', tableData);
    }

    select(parsedComand) {
        let [, columns, tableName, where] = parsedComand;

        if(columns === '*'){
            const header = Object.keys(this.contentTable[tableName].columns);
            const data = this.contentTable[tableName].data;

            console.log(header, data);

            return showTable(header, data);

        } else {
            columns = columns.split(', ');
    
            let rows = this.contentTable[tableName].data;
    
            if (where) {
                const [columnWhere, valueWhere] = where.split(" = ");
                rows = rows.filter(function (row) {
                    return row[columnWhere] === valueWhere;
                });
            }
            rows = rows.map(function (row) {
                let selectedRow = {};
                columns.forEach(function (column) {
                    selectedRow[column] = row[column];
                });
                return selectedRow;
            });

            const header = columns;
            const data = rows;

            console.log(header, data);
            
            return showTable(header, data);
        }
    }

    delete(parsedComand) {
        let [, tableName, where] = parsedComand;
        console.log(parsedComand);

        if (where) {
            let [whereParam, whereValue] = where.split(" = ");;
            this.contentTable[tableName].data = this.contentTable[tableName].data.filter( row => row[whereParam] !== whereValue );
        } else {
            this.contentTable[tableName].data = [];
        }

        const tableData = JSON.stringify(this.contentTable, undefined, 4);
        saveJson('db.json', tableData);
    }

    execute(statement) {
        return new Promise((resolve, reject) => {
            const result = this.parser.parse(statement);
            if (result) {
                resolve(this[result.command](result.parsedComand));
            }

            const message = `Syntax error: "${statement}"`;
            reject(new DatabaseError(statement, message));
        })
    }
}

module.exports = Database;