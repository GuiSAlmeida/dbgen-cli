
<h1 align="center">
  DBgen-CLI
</h1>

```sh
      _ _                         ____ _     ___    ╔═════════╤═══════════════════╤═════════╗
   __| | |__   __ _  ___ _ __    / ___| |   |_ _|   ║ Version │ Author            │ License ║
  / _` | '_ \ / _` |/ _ \ '_ \  | |   | |    | |    ╟─────────┼───────────────────┼─────────╢
 | (_| | |_) | (_| |  __/ | | | | |___| |___ | |    ║  0.0.1  │ Guilherme Almeida │   MIT   ║
  \__,_|_.__/ \__, |\___|_| |_|  \____|_____|___|   ╚═════════╧═══════════════════╧═════════╝
              |___/                              
```

dbgen-cli is a SGDB used with CLI created to study the practices of sql commands, databases and JS ES6 features.  
<br>

<p align="center"><img src="https://user-images.githubusercontent.com/45276342/121779626-03c74280-cb73-11eb-9aa7-6f7caa20c1e0.gif" alt="bdgen-cli" width="960" height="auto"/></p>

## __*Prerequisites*__

You should have installed the [node.js](https://nodejs.org/en/).

## __*Installation*__

Use the [npm](https://www.npmjs.com/) to install dependencies.

```node
cd dbgen-cli
npm install
```

Create a global symlink for a dependency.

```node
npm link
```

## __*Usage*__

In the terminal type the following commands.

```sh
Usage:
<commands> -> the keyword 'dbgen' followed by the quotation marks or single quotes

Commands:
create table <tablename> (<field & type>)                       create a new table
insert into <tablename> (<fieldname>) values (<fieldvalue>)     insert values in fields
select [fields] or [*] from author [where] <condition>          shows the selection table in the terminal
delete from <tablename> [where] <condition>                     delete the selected table or selected field according to where condition

```

## __*Examples*__

```sh
# Create table "authors"
dbgen "create table authors (name varchar(50), age int, city varchar(50), state varchar(50), country varchar(50))"

dbgen "select * from authors"

╔════╤══════╤═════╤══════╤═══════╤═════════╗
║ ID │ NAME │ AGE │ CITY │ STATE │ COUNTRY ║
╚════╧══════╧═════╧══════╧═══════╧═════════╝

# Inserting records into the table
dbgen "insert into authors (name, age, city, country) values (Martin Fowler, 57, Walsall, England)"
dbgen "insert into authors (name, age, city, country) values (Linus Torvalds, 51, Helsinki, Finland)"
dbgen "insert into authors (name, age, state, country) values (Douglas Crockford, 66, Minnesota, EUA)"

dbgen "select * from authors"
╔══════════╤═══════════════════╤═════╤══════════╤═══════════╤═════════╗
║ ID       │ NAME              │ AGE │ CITY     │ STATE     │ COUNTRY ║
╟──────────┼───────────────────┼─────┼──────────┼───────────┼─────────╢
║ 5dbd7b0e │ Martin Fowler     │ 57  │ Walsall  │ null      │ England ║
╟──────────┼───────────────────┼─────┼──────────┼───────────┼─────────╢
║ 1fa31324 │ Linus Torvalds    │ 51  │ Helsinki │ null      │ Finland ║
╟──────────┼───────────────────┼─────┼──────────┼───────────┼─────────╢
║ 294e8872 │ Douglas Crockford │ 66  │ null     │ Minnesota │ EUA     ║
╚══════════╧═══════════════════╧═════╧══════════╧═══════════╧═════════╝

# Querying records with where
dbgen "select id, name, age from authors where name = Linus Torvalds"
╔══════════╤════════════════╤═════╗
║ ID       │ NAME           │ AGE ║
╟──────────┼────────────────┼─────╢
║ 1fa31324 │ Linus Torvalds │ 51  ║
╚══════════╧════════════════╧═════╝

# Deleting records with where
dbgen "delete from authors where name = Martin Fowler"

dbgen "select * from authors"
╔══════════╤═══════════════════╤═════╤══════════╤═══════════╤═════════╗
║ ID       │ NAME              │ AGE │ CITY     │ STATE     │ COUNTRY ║
╟──────────┼───────────────────┼─────┼──────────┼───────────┼─────────╢
║ 1fa31324 │ Linus Torvalds    │ 51  │ Helsinki │ null      │ Finland ║
╟──────────┼───────────────────┼─────┼──────────┼───────────┼─────────╢
║ 294e8872 │ Douglas Crockford │ 66  │ null     │ Minnesota │ EUA     ║
╚══════════╧═══════════════════╧═════╧══════════╧═══════════╧═════════╝
```

Data written to the `/db.json` file
```json
{
    "authors": {
        "columns": {
            "id": "SERIAL NOT NULL",
            "name": "varchar(50)",
            "age": "int",
            "city": "varchar(50)",
            "state": "varchar(50)",
            "country": "varchar(50)"
        },
        "data": [
            {
                "id": "1fa31324",
                "name": "Linus Torvalds",
                "age": "51",
                "city": "Helsinki",
                "country": "Finland",
                "state": "null"
            },
            {
                "id": "294e8872",
                "name": "Douglas Crockford",
                "age": "66",
                "state": "Minnesota",
                "country": "EUA",
                "city": "null"
            }
        ]
    }
}
```

## __*Built With*__

* [nodeJS](https://nodejs.org/) - With the modules crypto and fs.
* [cli-table](https://github.com/Automattic/cli-table) - Used to display tables in the terminal.
* [figlet](https://github.com/patorjk/figlet.js) - Used to making large letters of logo.
* [chalk](https://github.com/chalk/chalk) - Used to logging of colored information.

## __*Author*__

[**Guilherme Almeida**](https://guisalmeida.com)

See also the list of [contributors](https://github.com/GuiSAlmeida/dbgen-cli/contributors) who participated in this project.
