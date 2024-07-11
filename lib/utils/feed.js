// lib/generateFeed.js

const fs = require('fs');
const util = require('util');
const path = require('path');
const { Feed } = require('feed');

const writeFile = util.promisify(fs.writeFile);

const siteUrl = 'https://roobottom.com';
const email = 'roo@roodesign.co.uk';
const MAX_ITEMS = 5;

function optimizeImageUrls(content) {
  return content.replace(/(<img[^>]+src=")([^"]+)(")/g, (match, p1, p2, p3) => {
      let newUrl = p2.replace(/(\?resize=\d+&quality=\d+)/, '?resize=400&quality=50');
      if (!newUrl.includes('?resize=400&quality=50')) {
          newUrl += '?resize=400&quality=50';
      }
      return `${p1}${newUrl}${p3}`;
  });
}

function convertContentUrls(content) {
  content = optimizeImageUrls(content);
  return content.replace(/src="\/(?!\/)/g, `src="${siteUrl}/`).replace(/href="\/(?!\/)/g, `href="${siteUrl}/`);
}

async function generateFeed(posts) {
    const feed = new Feed({
        title: "Jon’s Website",
        description: "My website, which is probably of little interest to anyone.",
        id: siteUrl,
        link: siteUrl,
        language: "en",
        image: `${siteUrl}/feed-logo.png`,
        favicon: `${siteUrl}/favicon.ico`,
        copyright: "All rights reserved, Jon Roobottom",
        updated: new Date(posts[0].date),
        author: {
            name: "Jon Roobottom",
            email: email,
            link: siteUrl
        }
    });

    posts.reverse().slice(0, MAX_ITEMS).forEach(article => {
        feed.addItem({
            title: article.title,
            id: article.slug,
            link: `${siteUrl}/articles/${article.slug}`,
            description: article.summary,
            content: convertContentUrls(article.content),
            date: new Date(article.date)
        });
    });

    const outputDir = path.join(__dirname, '../../collections/');
    const xmlOutputFilePath = path.join(outputDir, 'feed.xml');
    const jsonOutputFilePath = path.join(outputDir, 'feed.json');

    await writeFile(xmlOutputFilePath, feed.rss2());
    await writeFile(jsonOutputFilePath, feed.json1());

}

module.exports = generateFeed;
