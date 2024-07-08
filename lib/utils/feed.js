// lib/generateFeed.js

const fs = require('fs');
const path = require('path');
const { Feed } = require('feed');
const articles = require('../../collections/articles.json');

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

function generateFeed() {
    const feed = new Feed({
        title: "Jon’s Website",
        description: "My website, which is probably of little interest to anyone.",
        id: siteUrl,
        link: siteUrl,
        language: "en",
        image: `${siteUrl}/feed-logo.png`,
        favicon: `${siteUrl}/favicon.ico`,
        copyright: "All rights reserved, Jon Roobottom",
        updated: new Date(articles[0].date),
        author: {
            name: "Jon Roobottom",
            email: email,
            link: siteUrl
        }
    });

    articles.slice(0, MAX_ITEMS).forEach(article => {
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

    fs.writeFileSync(xmlOutputFilePath, feed.atom1(), 'utf8');  // Write the feed.xml to a file
    fs.writeFileSync(jsonOutputFilePath, feed.json1(), 'utf8');  // Write the feed.json to a file
}

module.exports = generateFeed;
