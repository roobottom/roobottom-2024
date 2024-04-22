const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const dataMiddleware = require('./lib/middleware/data');
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

//serve pages
app.get('/:page', require('./lib/routes/page'));

app.get('/', (req, res) => {
  res.render('homepage', { title: 'Home Page', content: 'Welcome to Express with Nunjucks!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Roobottom-com is running at: http://localhost:${PORT}`);
});
