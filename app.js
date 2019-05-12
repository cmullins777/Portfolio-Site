const express = require('express');
const app = express();
const data = require('./data.json');
const projects = data.projects;

app.set('view engine', 'pug');
app.use('/static', express.static('public'));



//Configure index route to render "Home" page
app.get('/', (req, res) => {
  res.render('index', {projects});
});
//Configure about route to render "About" page
app.get('/about', (req, res) => {
  res.render('about');
});

//Configure projects route to render "Projects" page
app.get('/projects/:id', (req, res) => {
  const {id} = req.params;
  const project = projects[id];
  if (isNaN(id) || id > projects.length) {
    return res.redirect('/');
  }
  res.render('project', {project});
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
  console.log("running on localhost:3000");
});
