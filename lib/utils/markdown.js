const matter = require('gray-matter');
const markdownIt = require('markdown-it');

const markdownItAttrs = require("markdown-it-attrs");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItDiv = require("markdown-it-div");
const markdownItAbbr = require("markdown-it-abbr");
const markdownItShortcodes = require('markdown-it-shortcode-tag');

//custom shortcodes
const figureShortcode = require('../shortcodes/figure');
const exampleShortcode = require('../shortcodes/example');

const shortcodes = {
  figure: {
    render: function (attrs, env) {
      return figureShortcode(attrs)
    }
  },
  example: {
    render: (attrs, env) => {
      return exampleShortcode(attrs.url, attrs.height)
    }
  }
}

// Configure Markdown-it
let md = markdownIt({
  typographer: true,
  quotes: '“”‘’',
  html: true
})
.use(markdownItAttrs)
.use(markdownItAnchor)
.use(markdownItDiv)
.use(markdownItAbbr)
.use(require('markdown-it-shortcode-tag'), shortcodes)


const extractFrontmatter = (data) => {
  return matter(data);
}

const markdownToHtml = (markdown) => {
  return md.render(markdown);
}

module.exports = {
  extractFrontmatter,
  markdownToHtml
}