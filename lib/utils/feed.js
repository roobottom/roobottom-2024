const Feed = require('feed').Feed;
const articles = require('../../collections/articles.json');

const siteUrl = 'https://roobottom.com';
const email = 'roo@roodesign.co.uk';

function convertContentUrls(content) {
    // This is a basic implementation and might need more robust handling
    // depending on how complex your URLs are in the content
    return content.replace(/src="\/(?!\/)/g, `src="${siteUrl}/`).replace(/href="\/(?!\/)/g, `href="${siteUrl}/`);
}

const feed = new Feed({
    title: "Jon’s Website",
    description: "My website, which is probably of little interest to anyone.",
    id: siteUrl,
    link: siteUrl,
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: `${siteUrl}/feed-logo.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: "All rights reserved, Jon Roobottom",
    updated: new Date(articles[0].date), // optional, default = today
    author: {
        name: "Jon Roobottom",
        email: email,
        link: siteUrl
    }
});

module.exports = () => {
    
    articles.forEach(article => {
        feed.addItem({
            title: article.title,
            id: article.slug,
            link: `${siteUrl}/articles/${article.slug}`,
            description: article.summary,
            content: convertContentUrls(article.content),
            date: new Date(article.date)
        });
    });

    return feed.atom1();
}