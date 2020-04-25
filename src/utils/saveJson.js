'use strict';

const fs = require('fs');

module.exports = function saveJSON(file, data) {
    fs.writeFile(file, data, (error) => {
        if (error) throw error;
    });
};