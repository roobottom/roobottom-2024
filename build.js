/*
Build Roobottom.com

Builds all collections, tags and Kanga (Design system) collection data
*/

const fs = require('fs');
const path = require('path');
const util = require('util');
const { extractFrontmatter, markdownToHtml } = require('./lib/utils/markdown');
const slugify = require('slugify');
const fg = require('fast-glob');  // Include fast-glob

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
    return slugify(str.toLowerCase(), {
        strict: true,
        remove: /^[\d]{4}-[\d]{2}-[\d]{2}-/g
    })
}

async function ensureDirectoryExists(dirPath) {
    try {
        await mkdir(dirPath, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
}

async function createCollections(collections) {

    let tagsMap = new Map();

    for(let collectionObj of collections) {
        const outputFilePath = path.join(__dirname, collectionObj.output);
        const outputDir = path.dirname(outputFilePath);

        await ensureDirectoryExists(outputDir);

        const files = await fg(collectionObj.input, { cwd: __dirname });
        let collection = [];

        for (let filePath of files) {
            console.log('Processing file:', filePath);
            const content = await readFile(filePath, 'utf8');
            const parsed = extractFrontmatter(content);
            const html = markdownToHtml(parsed.content);
            const postSlug = parsed.data.title ? toUrlSlug(parsed.data.title) : undefined;
    
            collection.push({
                slug: postSlug,
                content: html,
                ...parsed.data
            });
    
            if (parsed.data.tags && Array.isArray(parsed.data.tags)) {
                parsed.data.tags.forEach(tag => {
                    const titleCaseTag = toTitleCase(tag);
                    tagsMap.set(titleCaseTag, (tagsMap.get(titleCaseTag) || 0) + 1);
                });
            }
        }
    
        collection.sort((a, b) => new Date(b.date) - new Date(a.date));
        await writeFile(outputFilePath, JSON.stringify(collection, null, 2));
    }

    //write tags file
    const tagsData = Array.from(tagsMap, ([title, count]) => ({ title, count, slug: toUrlSlug(title) }));
    await writeFile(path.join(__dirname, 'collections/tags.json'), JSON.stringify(tagsData, null, 2));
}

async function createKanga() {

    let structuredData = [];
    //get files from kanga, just one level deep mind
    const files = await fg('src/content/kanga/*/*.md', { cwd: __dirname });

    for(let file of files) {
        // Extract folder name from the post's file path
        const pathParts = file.split('/');
        const folderName = pathParts[pathParts.length - 2];

        // Check if the folder already exists in the structuredData
        let folderObj = structuredData.find(f => f.title === folderName);
        if (!folderObj) {
            folderObj = { title: folderName, items: [] };
            structuredData.push(folderObj);
        }

        const content = await readFile(file, 'utf8');
        const parsed = extractFrontmatter(content);
        const html = markdownToHtml(parsed.content);
        const postSlug = parsed.data.title ? toUrlSlug(parsed.data.title) : undefined;

        folderObj.items.push({
            slug: postSlug,
            content: html,
            ...parsed.data
        });
    }

    structuredData.sort((a, b) => a.title.localeCompare(b.title));
    await writeFile('collections/kanga.json', JSON.stringify(structuredData, null, 2));

}

async function createKangaExamples() {
    let structuredData = {};
    const files = await fg('src/content/kanga/example/*/*.{njk,md}', { cwd: __dirname });

    for(let file of files) {
        // Extract folder name from the post's file path
        const pathParts = file.split(path.sep);
        const folderName = pathParts[pathParts.length - 2];
        const fileName = path.basename(file, path.extname(file));
        const type = path.extname(file).slice(1)

        console.log('Kanga example:', folderName, fileName);

        // Check if the folder already exists in the structuredData
        if (!structuredData[folderName]) {
            structuredData[folderName] = [];
        }

        const content = await readFile(file, 'utf8');
        const parsed = extractFrontmatter(content);

        structuredData[folderName].push({
            slug: fileName,
            type: type,
            title: parsed.data.title,
            content: parsed.content
        });

    }
    await writeFile('collections/kanga-examples.json', JSON.stringify(structuredData, null, 2));

}


createCollections([
    {
        input: 'src/content/articles/*.md', 
        output: 'collections/articles.json'
    }
]);
createKanga();
createKangaExamples();
