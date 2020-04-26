 
'use strict';

class Parser {
    constructor(){
        this.commands = new Map();
        this.commands.set("createTable", /^create table (\w+)\s\((.+)\)/);
        this.commands.set("insert", /^insert into (\w+)\s\((.+)\)\svalues\s\((.+)\)/);
        this.commands.set("select", /^select (\*?.*) from (\w+)(?:\swhere\s(.+))?/);
        this.commands.set("delete", /^delete from (\w+)(?:\swhere\s(.+))?/);
        this.commands.set("help", /help/);
    }

    parse(statement){
        for (let [command, regexp] of this.commands) {
            const parsedComand = statement.match(regexp);
            if(parsedComand) {
                return {
                    command: command,
                    parsedComand: parsedComand
                }
            }
        }
    }
}

module.exports = Parser;