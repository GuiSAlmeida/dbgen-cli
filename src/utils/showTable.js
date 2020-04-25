'use strict'

const chalk = require('chalk');
const Table = require('cli-table');

module.exports = function showTable(header, data) {

    const table = new Table({
        head: header, //['id', 'to-do', 'status']
        colWidths: [20, 20, 20, 20, 20, 20]
    });
    data.map((field) => {
        console.log(field);
        const newColumns = header.filter(key => {
            return key === field;
        })
        table.push(newColumns);
    });
    
    console.log(table.toString());
};