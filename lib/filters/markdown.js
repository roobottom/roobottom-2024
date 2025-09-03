const markdownIt = require('markdown-it');  

module.exports = function(text) {
  const md = new markdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  return md.render(text || '');
}