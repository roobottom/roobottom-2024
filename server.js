const express = require('express');
const app = express();
const dataMiddleware = require('./lib/middleware/data');
const nunjucks = require('nunjucks');
const filters = require('./lib/filters');


// Configure Nunjucks
const env = nunjucks.configure(['src/views', 'src/layouts', 'src/components'], {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');

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

app.get('/', (req, res) => {
  res.render('default', { title: 'Home Page', content: 'Welcome to Express with Nunjucks!' });
});

app.get('/articles', (req,res) => {
  res.render('articles');
});

//serve top level pages
app.get('/:page', require('./lib/routes/page'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Roobottom-com is running at: http://localhost:${PORT}`);
});
