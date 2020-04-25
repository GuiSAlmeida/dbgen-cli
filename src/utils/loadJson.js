'use strict';

const fs = require('fs');

module.exports = function loadJSON (filename = ''){
    return JSON.parse(
        fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : '""'
    );
};