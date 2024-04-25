const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");
const filters = require("../filters.js");
const he = require('he');

module.exports = function (exampleUrl, height = 300) {

  const languageMap = {
    ".njk": "liquid",
    ".md": "markdown"
  }
  const sourceDir = "src/content";
  let sourceFile = '', language = '';
  
  for (const ext of ['.njk', '.md']) {

    let currentFileToCheck = path.join(process.cwd(), sourceDir, exampleUrl + ext)

    if (fs.existsSync(currentFileToCheck)) {
      sourceFile = currentFileToCheck;
      language = languageMap[ext];
      break;
    }
  }

  let env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path.join(process.cwd(), sourceDir))
  );

  Object.keys(filters).forEach(filterName => {
    env.addFilter(filterName, filters[filterName]);
  });

  let fileContent;
  try {
    // Synchronously read the file content
    fileContent = fs.readFileSync(sourceFile, "utf8");
    fileContent = removeFrontmatter(fileContent);
    fileContent = safeHtml(fileContent);
  } catch (error) {
    console.error("Error reading file:", error);
    return "Error loading file content.";
  }

  return `
<div class="example">
<header class="example-header">
  <a href="${exampleUrl}" target="_blank" class="example-open-link">Open this example in a new tab</a>
</header>
<iframe src="${exampleUrl}" class="example-iframe" height="${height}"></iframe>
<details>
<summary><span class="example-summary-link">View the code for this example</span></summary>
<div class="example-code">

<pre class="language-${language}">
<code>${fileContent}</code>
</pre>

</div>
</details>
</div>
`;
}


function removeFrontmatter (content) {
  const frontMatterPattern = /^---[\s\S]+?---\s*/;
  return content.replace(frontMatterPattern, '');
}

function safeHtml (html) {
  return he.escape(html);
}