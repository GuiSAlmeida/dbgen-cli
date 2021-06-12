'use strict';

const DatabaseError = require('./databaseerror');
const Parser = require('./parser');

const generateId = require('./utils/generateId');
const loadJson = require('./utils/loadJson');
const saveJson = require('./utils/saveJson');
const showTable = require('./utils/showTable');

const chalk = require('chalk');
const figlet = require('figlet');
class Database {
    constructor() {
        this.newTable = {};
        this.parser = new Parser();
        this.contentTable = loadJson('db.json');
    }

    createTable(parsedComand) {
        let [, tableName, columns] = parsedComand;
        this.newTable[tableName] = {
            columns: {
                id: "SERIAL NOT NULL"
            },
            data: []
        };

        columns = columns.trim().split(", ");

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
            row[column] = value ? value : "null";
        }

        let dataColumns = Object.keys(this.contentTable[tableName].columns);

        for (let i = 0; i < dataColumns.length; i++) {
            const column = dataColumns[i];
            if (!row[column]) {
                row[column] = "null";
            }
        }

        this.contentTable[tableName].data.push(row);

        const tableData = JSON.stringify(this.contentTable, undefined, 4);
        saveJson('db.json', tableData);
    }

    select(parsedComand) {
        let [, columns, tableName, where] = parsedComand;

        if (columns === '*') {
            const header = Object.keys(this.contentTable[tableName].columns);
            const data = this.contentTable[tableName].data;

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

            return showTable(header, data);
        }
    }

    delete(parsedComand) {
        let [, tableName, where] = parsedComand;

        if (where) {
            let [whereParam, whereValue] = where.split(" = ");;
            this.contentTable[tableName].data = this.contentTable[tableName].data.filter(row => row[whereParam] !== whereValue);
        } else {
            this.contentTable[tableName].data = [];
        }

        const tableData = JSON.stringify(this.contentTable, undefined, 4);
        saveJson('db.json', tableData);
    }

    help() {
        console.log(
            `${chalk.cyan(figlet.textSync('dbgen CLI'))}
${chalk.bold('Usage:')}
dbgen '<commands>' -> the keyword ${chalk.green.bold('dbgen')} followed by the quotation marks or single quotes'\n
${chalk.bold('Commands:')}
dbgen "create table <tablename> (<field & type>)                        create a new table
dbgen "insert into <tablename> (<fieldname>) values (<fieldvalue>)"     insert values in fields
dbgen "select [fields] or [*] from author [where] <condition>"          shows the selection table in the terminal
dbgen "delete from <tablename> [where] <condition>"                     delete the selected table or selected field according to where condition
\ndbgen@0.0.1 fork in https://github.com/GuiSAlmeida/database-generator
            `
        )
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