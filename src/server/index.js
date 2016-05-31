import express from 'express';
import { TWITCH_API_KEY } from './.secrets';
import streams from './routes/streams';
import games from './routes/games';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render('index', {
		bundleSrc: 'http://localhost:3000/static/bundle.js'
	});
});

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
