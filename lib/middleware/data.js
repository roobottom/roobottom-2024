const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

async function loadDataFromDirectory(dir) {
    const directoryPath = path.join(__dirname, dir);
    const files = await readdir(directoryPath);
    const data = {};

    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const fileStat = await stat(filePath);

        if (fileStat.isFile() && (file.endsWith('.json') || file.endsWith('.js'))) {
            const key = path.basename(file, path.extname(file));  // Strip extension for key
            data[key] = require(filePath);
        }
    }

    return data;
}

const dataMiddleware = async (req, res, next) => {
    try {
        res.locals = await loadDataFromDirectory('../../src/data');
    } catch (error) {
        console.error("Failed to load data:", error);
        res.locals.data = {};
    }
    next();
};

module.exports = dataMiddleware;

