#!/usr/bin/env node

'use strict'

const Database = require('./src/database');
const database = new Database();
const chalk = require('chalk');
const figlet = require('figlet');

console.log(chalk.cyan(figlet.textSync('dbgen CLI')));

const newDatabase = async function (args) {
    try {
        await database.execute(args);
    } catch (error) {
        console.log(`${chalk.red(error.message)}`);
    }
};

let args = process.argv.splice(2, process.argv.length - 1).join(' ');

newDatabase(args);


//dbgen "create table author (id serial, name varchar(50), age int, city varchar(50), state varchar(50), country varchar(50))"
//dbgen "insert into author (id, name, age) values (1, Douglas Crockford, 62)"
//dbgen "insert into author (id, name, age) values (2, Linus Torvalds, 47)"
//dbgen "insert into author (id, name, age) values (3, Martin Fowler, 54)"
//dbgen "select age from author where name = Linus Torvalds"
//dbgen "delete from author where name = Linus Torvalds"