const matter = require('gray-matter');
const markdownIt = require('markdown-it');

const markdownItAttrs = require("markdown-it-attrs")
const markdownItAnchor = require("markdown-it-anchor")
const markdownItDiv = require("markdown-it-div")
const markdownItAbbr = require("markdown-it-abbr")
const markdownItFootnote = require("markdown-it-footnote")
const markdownItCustomFigures = require("./markdownItFigure")

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
.use(markdownItFootnote)
.use(markdownItCustomFigures)

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