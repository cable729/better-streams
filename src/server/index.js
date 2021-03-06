import express from 'express';
import streams from './routes/streams';
import games from './routes/games';
import path from 'path';

// Load environment variables
require('dotenv').config();

// If this is set, we want to build in production mode
const isProd = process.env.NODE_ENV ? true : false;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const devBundleSrc = 'http://localhost:3000/static/bundle.js';
const prodBundleSrc = '/bundle.js';

// setup react app
app.get('/', (req, res) => {
	res.render('index', {
		bundleSrc: isProd ? prodBundleSrc : devBundleSrc
	});
});
app.use(express.static(path.join(__dirname, 'public')));

// add routes
streams(app);
games(app);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  let host = server.address().address;

  if (host === '::') {
    host = 'localhost';
  }

  console.log('Listening at http://%s:%s', host, port);
});
