const fs = require('fs');
const path = require('path');
const { extractFrontmatter, markdownToHtml } = require('../utils/markdown');
const notFoundRoute = require('./404');

module.exports = (req, res, page) => {
  const markdownFile = page || req.params.page;
  const markdownPath = path.join(__dirname, '../../src/content', `${markdownFile}.md`);

  fs.readFile(markdownPath, 'utf8', (err, data) => {
    if (err) {
      console.error('404. Tried to render:', markdownPath)
      return notFoundRoute(res,req);
    }

    console.log('Rendered page:', markdownPath)
    const { data: frontMatter, content: markdownContent } = extractFrontmatter(data);
    const view = frontMatter.layout ? `${frontMatter.layout}` : 'views/default';
    const htmlContent = markdownToHtml(markdownContent);

    Object.assign(res.locals, frontMatter);
    
    res.render(view, { 
      content: htmlContent,
      ...req.query
    });
  });
};