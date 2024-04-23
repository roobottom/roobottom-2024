const fs = require('fs');
const path = require('path');
const util = require('util');
const { extractFrontmatter, markdownToHtml } = require('./lib/utils/markdown');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

// Converts a string to title case
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Converts a string to a URL-friendly slug
function toUrlSlug(str) {
    return str.toLowerCase().replace(/[\s\W-]+/g, '-');
}

async function ensureDirectoryExists(dirPath) {
    try {
        await mkdir(dirPath, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err; // Ignore the error if the directory already exists
    }
}

async function processMarkdownFiles(sourceDirectory, outputFilename) {
    const directoryPath = path.join(__dirname, sourceDirectory);
    const outputFilePath = path.join(__dirname, outputFilename);
    const outputDir = path.dirname(outputFilePath);

    await ensureDirectoryExists(outputDir); // Ensure the directory exists

    const files = await readdir(directoryPath);
    let collection = [];
    let tagsMap = new Map(); // To hold tag counts

    for (let file of files.filter(f => f.endsWith('.md'))) {
        const filePath = path.join(directoryPath, file);
        const content = await readFile(filePath, 'utf8');
        const parsed = extractFrontmatter(content);
        const html = markdownToHtml(parsed.content);

        collection.push({
            slug: file.slice(0, -3),
            html,
            ...parsed.data
        });

        // Extract tags and update the tagsMap with counts
        if (parsed.data.tags && Array.isArray(parsed.data.tags)) {
            parsed.data.tags.forEach(tag => {
                const titleCaseTag = toTitleCase(tag);
                tagsMap.set(titleCaseTag, (tagsMap.get(titleCaseTag) || 0) + 1);
            });
        }
    }

    // Sort posts by date if present
    collection.sort((a, b) => new Date(b.date) - new Date(a.date));
    await writeFile(outputFilePath, JSON.stringify(collection, null, 2));

    // Prepare tags data array
    const tagsData = Array.from(tagsMap, ([title, count]) => ({ title, count, slug: toUrlSlug(title) }));
    await writeFile(path.join(__dirname, 'collections/tags.json'), JSON.stringify(tagsData, null, 2));
}

async function buildAllCollections() {
    await processMarkdownFiles('src/content/articles', 'collections/articles.json');
    // Add more collections as needed
}

buildAllCollections().catch(console.error);
