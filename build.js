/*
Build Roobottom.com

Builds: 

- all collections
- tags
- feeds
- Kanga collection data
*/

const fs = require('fs');
const path = require('path');
const util = require('util');
const { extractFrontmatter, markdownToHtml } = require('./lib/utils/markdown');
const slugify = require('slugify');
const fg = require('fast-glob');  // Include fast-glob
const generateFeed = require('./lib/utils/feed');

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

function findSimilarPosts(post, allPosts, limit = 5) {
    if (!post.tags || !Array.isArray(post.tags)) return [];

    const postTags = new Set(post.tags.map(tag => tag.toLowerCase()));
    const similarPosts = allPosts
        .filter(p => p.slug !== post.slug && p.tags && Array.isArray(p.tags))
        .map(p => {
            const pTags = new Set(p.tags.map(tag => tag.toLowerCase()));
            const commonTags = new Set([...postTags].filter(tag => pTags.has(tag)));
            return { post: p, commonTags: commonTags.size };
        })
        .filter(p => p.commonTags > 0)
        .sort((a, b) => b.commonTags - a.commonTags)
        .slice(0, limit)
        .map(p => ({
            slug: p.post.slug,
            title: p.post.title,
            date: p.post.date,
            tags: p.post.tags,
            summary: p.post.summary,
            cover: p.post.cover || undefined,
            coverAlt: p.post.coverAlt || undefined
        }));

    return similarPosts;
}

async function createCollections(collections) {

    let tagsMap = new Map();
    let allPosts = [];

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

            const postData = {
                slug: postSlug,
                content: html,
                ...parsed.data
            }
    
            collection.push(postData);
            allPosts.push(postData); // Add post to allPosts array
    
            if (parsed.data.tags && Array.isArray(parsed.data.tags)) {
                parsed.data.tags.forEach(tag => {
                    const titleCaseTag = toTitleCase(tag);
                    if (!tagsMap.has(titleCaseTag)) {
                        tagsMap.set(titleCaseTag, []);  // Initialize with an empty array
                    }
                    tagsMap.get(titleCaseTag).push(postData);
                });
            }
        }

        // Store the collection data without sorting
        await writeFile(outputFilePath, JSON.stringify(collection, null, 2));
    }

    // After all posts from all collections are processed, find similar posts
    for (let collectionObj of collections) {
        const outputFilePath = path.join(__dirname, collectionObj.output);
        let collection = JSON.parse(await readFile(outputFilePath, 'utf8'));

        const updatedCollection = collection.map(post => ({
            ...post,
            similarPosts: findSimilarPosts(post, allPosts)
        }));

        // Sort the collection by date before saving
        updatedCollection.sort((a, b) => new Date(b.date) - new Date(a.date));
        await writeFile(outputFilePath, JSON.stringify(updatedCollection, null, 2));
    }

    // Write tags file
    const tagsData = Array.from(tagsMap, ([title, posts]) => ({
        title,
        count: posts.length,
        slug: toUrlSlug(title),
        posts
    }));
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

        if(parsed.data.css) {
            console.log('parsed css', parsed.data.css)
        }

        structuredData[folderName].push({
            slug: fileName,
            type: type,
            ...parsed.data,
            title: parsed.data.title,
            content: parsed.content
        });

    }
    await writeFile('collections/kanga-examples.json', JSON.stringify(structuredData, null, 2));

}


async function build() {
  await createCollections([
      {
          input: 'src/content/articles/*.md', 
          output: 'collections/articles.json'
      }
  ]);
  await createKanga();
  await createKangaExamples();
  await generateFeed();  // Call the feed generation function
}

build();