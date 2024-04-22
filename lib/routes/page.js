const fs = require('fs');
const path = require('path');
const { extractFrontmatter, markdownToHtml } = require('../utils/markdown')

module.exports = (req, res) => {
  const page = req.params.page;
  const markdownPath = path.join(__dirname, '../../src/content', `${page}.md`);
  console.log(markdownPath)

  fs.readFile(markdownPath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('Page not found');
      return;
    }

    const { data: frontMatter, content: markdownContent } = extractFrontmatter(data);
    const layout = frontMatter.layout || 'default.njk';
    const htmlContent = markdownToHtml(markdownContent);

    Object.assign(res.locals, frontMatter);
    res.render(layout, { content: htmlContent });
  });
};