const express = require('express');
const app = express();
const dataMiddleware = require('./lib/middleware/data');
const imagesMiddleware = require('./lib/middleware/images');
const styleMiddleware = require('./lib/middleware/style');
const nunjucks = require('nunjucks');
const filters = require('./lib/filters');
const { markdownToHtml } = require('./lib/utils/markdown');
const makeFeed = require('./lib/utils/feed')
const notFoundRoute = require('./lib/routes/404');
const cookieParser = require('cookie-parser');
const renderMarkdownPageFromRoute = require('./lib/routes/page')

//load cookie parser
app.use(cookieParser());

// Configure Nunjucks
const env = nunjucks.configure('src', {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');

Object.keys(filters).forEach(filterName => {
  env.addFilter(filterName, filters[filterName]);
});

// Parse URL encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('./src/assets/static'));

//load global data
app.use(dataMiddleware);

//load userStyles
app.use(styleMiddleware);

//handle image requests
app.use('/images', imagesMiddleware);

//feed
app.get('/feed.xml', (req, res) => {
  const xml = makeFeed();
  res.type('application/xml');
  res.send(xml);
});

//load collections
app.use((req, res, next) => {
  try {
      res.locals.collections = {
          articles: require('./collections/articles.json'),
          tags: require('./collections/tags.json'),
          kanga: require('./collections/kanga.json'),
          kangaExamples: require('./collections/kanga-examples.json')
      };
  } catch (error) {
      console.error("Failed to load collections:", error);
      // Handle errors or set default empty objects
      res.locals.collections = {
          articles: [],
          tags: [],
          kanga: [],
          kangaExamples: {}
      };
  }
  next();
});

/*
--- routes ---
*/

app.get('/', (req, res) => {
  renderMarkdownPageFromRoute(req, res, 'home');
});

app.get('/articles', (req,res) => {
  res.render('views/articles', {
    title: 'Articles',
    section_id: 'articles'
  });
});

app.get('/articles/:slug', (req,res) => {
  const slug = req.params.slug;
  const article = res.locals.collections.articles.find(item => item.slug === slug);
  
  if (!article) {
    return notFoundRoute(res,req);
  }

  res.render('views/article', {
    section_id: 'articles',
    ...article,
    breadcrumbs: [{
      title: 'Articles',
      url: '/articles'
    }]
  });
});


//serach through multi nested objects, like kanga.json
function findEntryBySlug(slug, data) {
  for (const section of data) {
      const foundItem = section.items.find(item => item.slug === slug);
      if (foundItem) {
          return {
              section: section.title,
              ...foundItem
          };
      }
  }
  return null; // Return null if no matching entry is found
}

app.get('/kanga/:slug', (req,res) => {
  const slug = req.params.slug;
  const entry = findEntryBySlug(slug, res.locals.collections.kanga)
  
  if (!entry) {
    return notFoundRoute(res,req);
  }

  res.render('views/kanga', {
    section_id: 'kanga',
    showBreadcrumbs: true,
    ...entry
  });
});

app.get('/kanga/example/:section/:slug', (req,res) => {
  console.log()
  const section = req.params.section;
  const slug = req.params.slug;
  const entry = res.locals.collections.kangaExamples[section].find(item => item.slug === slug)

  let renderedContent = ''

  if(entry.type === "njk") {
    renderedContent = env.renderString(entry.content);
  }

  if(entry.type === "md") {
    renderedContent = markdownToHtml(entry.content);
  }

  res.render('views/kanga-example', {
    section_id: 'kanga',
    ...entry,
    title: `${entry.title} - Example `,
    content: renderedContent,
    locals: res.locals
  })
})

app.get('/subjects', (req,res) => {
  res.render('views/tags', {
    title: 'Subjects',
    section_id: 'subjects'
  });
});

app.get('/subjects/:slug', (req,res) => {
  const slug = req.params.slug;
  const entry = res.locals.collections.tags.find(item => item.slug === slug)

  if (!entry) {
    return notFoundRoute(res,req);
  }

  res.render('views/tag', {
    title: entry.title,
    section_id: 'subjects',
    posts: entry.posts,
    breadcrumbs: [{
      title: 'Subjects',
      url: '/subjects'
    }]
  });
});

app.post('/time-travel', (req,res) => {
  const { style } = req.body;
  res.cookie('userStyle', style, { maxAge: 2592000000, httpOnly: true });
  res.redirect('/time-travel?updated=true');
});

//serve top level pages
app.get('/:page', (req, res) => {
  renderMarkdownPageFromRoute(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Roobottom-com is running at: http://localhost:${PORT}`);
});
