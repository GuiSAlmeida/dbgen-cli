#!/usr/bin/env node

'use strict'

const Database = require('./src/database');
const database = new Database();
const chalk = require('chalk');

const newDatabase = function (args) {
    try {
        database.execute(args);
    } catch (error) {
        console.log(`${chalk.red.bold(error.message)}`);
    }
};

let args = process.argv.splice(2, process.argv.length - 1).join(' ');

newDatabase(args);