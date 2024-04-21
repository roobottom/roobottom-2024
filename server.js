const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const dataMiddleware = require('./lib/data');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const markdownIt = require('markdown-it');
const filters = require('./lib/filters');

// Configure Nunjucks
const env = nunjucks.configure(['src/views', 'src/layouts', 'src/components'], {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');

// Apply each filter from the imported filters module
Object.keys(filters).forEach(filterName => {
  env.addFilter(filterName, filters[filterName]);
});

// Configure Markdown-it
let md = markdownIt({
  typographer: true,
  quotes: '“”‘’',
  html: true
});

// Serve static files
app.use(express.static('./src/assets'));

//load global data
app.use(dataMiddleware);

//load collections
app.use((req, res, next) => {
  try {
      res.locals.collections = {
          articles: require('./collections/articles.json'),
      };
  } catch (error) {
      console.error("Failed to load collections:", error);
      // Handle errors or set default empty objects
      res.locals.collections = {
          articles: [],
      };
  }
  next();
});

//render pages
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const markdownPath = path.join(__dirname, 'src/content', `${page}.md`);

  // Read the Markdown file
  fs.readFile(markdownPath, 'utf8', (err, data) => {
    if (err) {
      // Error reading the file
      res.status(404).send('Page not found');
      return;
    }

    // Extract front matter from Markdown content
    const { data: frontMatter, content: markdownContent } = matter(data);

    // Get the template specified in front matter (default to 'default.njk' if not specified)
    const layout = frontMatter.layout || 'default.njk';

    // Convert Markdown content to HTML
    const htmlContent = md.render(markdownContent);

    // Pass all front matter items as top-level variables to the template
    Object.assign(res.locals, frontMatter);

    // Render the specified layout with Markdown content
    res.render(layout, { content: htmlContent });
  });
});

app.get('/', (req, res) => {
  res.render('homepage', { title: 'Home Page', content: 'Welcome to Express with Nunjucks!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Roobottom-com is running at: http://localhost:${PORT}`);
});
