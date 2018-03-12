// const http = require('http');
const path = require('path');
const express = require('express');
// const { studios } = require('./studios');
const { studios } = require('./studios');

const app = express();
const port = process.env.PORT || 8585;
const publicPath = path.join(__dirname, 'dist');

app.set('port', port);

// TODO: check HTTP request header for Accept-Encoding: gzip, deflate
// app.get('*.js', (req, res, next) => {
//   req.url += '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
// });

// app.get('*.css', (req, res, next) => {
//   req.url += '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/css');
//   next();
// });

app.use(express.static(publicPath));

// app.get('/favicon.ico', (req, res) => {
//   res.set('Content-Type', 'image/x-icon');
//   res.status(200).end();
// });

app.get('/studios', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  // res.json(studios);
  setTimeout(() => {
    const randNum = Math.random();
    if (randNum > 0.6) {
      res.sendStatus(403);
      return;
    }
    res.json(studios);
  }, 3000);
  // res.header('Content-Type', 'application/json');
  // res.sendFile(path.join(__dirname, 'studios.json'));
});

app.get('*', (req, res, next) => { // consider app.all('*', ...)
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server is listening at ${port} port`);
});
