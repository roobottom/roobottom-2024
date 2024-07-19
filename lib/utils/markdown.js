const matter = require('gray-matter');
const markdownIt = require('markdown-it');

const markdownItAttrs = require("markdown-it-attrs");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItDiv = require("markdown-it-div");
const markdownItAbbr = require("markdown-it-abbr");
const markdownItFootnote = require("markdown-it-footnote");

//custom shortcodes
const figureShortcode = require('../shortcodes/figure');
const exampleShortcode = require('../shortcodes/example');
const statusNamesShortcode = require('../shortcodes/statusNames');

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
  },
  statusNames: {
    render: (attrs, env) => {
      return statusNamesShortcode()
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
.use(markdownItFootnote)

// Custom renderer for footnotes
md.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
  var n = Number(tokens[idx].meta.id + 1).toString();
  return `<sup class="footnote-ref"><a href="#fn${n}" id="fnref${n}">${n}</a></sup>`;
};

// Custom renderer for footnote anchor
md.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
  var n = Number(tokens[idx].meta.id + 1).toString();
  return ` <a href="#fnref${n}" class="footnote-backref">↩</a>`;
};

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