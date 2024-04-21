const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const path = require('path');

// Configure Nunjucks
nunjucks.configure(['src/views', 'src/layouts', 'src/components'], {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');

// Serve static files
app.use(express.static(path.join(__dirname, 'assets')));

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
  res.render('homepage', { title: 'Home Page', content: 'Welcome to Express with Nunjucks!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Roobottom-com is running at: http://localhost:${PORT}`);
});
