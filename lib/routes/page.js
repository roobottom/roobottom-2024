const fs = require('fs');
const path = require('path');
const { extractFrontmatter, markdownToHtml } = require('../utils/markdown')

module.exports = (req, res) => {
  const page = req.params.page;
  const markdownPath = path.join(__dirname, '../../src/content', `${page}.md`);

  fs.readFile(markdownPath, 'utf8', (err, data) => {
    if (err) {
      console.error('404. Tried to render:', markdownPath)
      res.status(404).render('default', {
        title: 'Page not found',
        introduction: 'That page cannot be found. Soz.'
      });
      return;
    }

    console.log('Rendered page:', markdownPath)
    const { data: frontMatter, content: markdownContent } = extractFrontmatter(data);
    const layout = frontMatter.layout || 'default.njk';
    const htmlContent = markdownToHtml(markdownContent);

    Object.assign(res.locals, frontMatter);
    res.render(layout, { content: htmlContent });
  });
};