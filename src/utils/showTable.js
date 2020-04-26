'use strict'

const Table = require('cli-table');

module.exports = function showTable(header, data) {
    let sizes = [];
    sizes.fill(20, 0, header.length);

    const table = new Table({
        chars: {
            'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
            , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
            , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
            , 'right': '║', 'right-mid': '╢', 'middle': '│'
        },
        head: header, //['id', 'to-do', 'status']
        colWidths: sizes // [20, 20, 20...]
    });

    data.map((field) => {
        let newColumns = [];
        header.forEach(element => {
            newColumns.push(field[element]);
        });
        return table.push(newColumns);
    });

    console.log(table.toString());
};