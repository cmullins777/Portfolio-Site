// Require express, set var for json file and projects
const express = require('express');
const app = express();
const data = require('./data.json');
const projects = data.projects;

// Use pug templates
app.set('view engine', 'pug');
// Use express.static
app.use('/static', express.static('public'));

// Configure index route to render "Home" page
app.get('/', (req, res) => {
  res.render('index', {projects});
});

// Configure about route to render "About" page
app.get('/about', (req, res) => {
  res.render('about');
});

// Configure projects route to render "Projects" page
// Redirect non-existant project pages back to Home
app.get('/projects/:id', (req, res) => {
  const {id} = req.params;
  const project = projects[id];
  if (isNaN(id) || id >= projects.length) {
   return res.redirect('/');
  }
  res.render('project', {project});
});

// 404 error handling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  console.log("Sorry, there's an error.")
  next(err);
});

// Error handling
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  console.log("Sorry, there's an error.")
  res.render('error');
});

// Set app to listen on localhost:3000
app.listen(3000, () => {
  console.log("running on localhost:3000");
});
