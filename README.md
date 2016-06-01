# better-streams
Better Streams is a website to show if [league](leagueoflegends.com) streamers are currently in a game, and if so, what champion they are playing and how long they have been in game. It came about when I realized that LoL streamers generally spend about half of their time playing League of Legends. The rest is spent in queue, picking and banning champions, loading into game, and waiting for minions to reach lane.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
You will need [node 6.2.0](https://nodejs.org/en/download/current/) and `npm` (`3.x` preferred). In order to run the application, you will need a Twitch client id and a Riot API key. Put them in a `.env` file in the root directory. It should look something like this:

```
TWITCH_API_KEY=......
RIOT_API_KEY=......
```

### Installing
In order to do anything useful with this project, you will need to first install the node packages.

```
npm install
```

To start the back-end server, run

```
npm run watch-server
```

To run the front-end hot reloading server, run

```
npm run watch-client
```

## Running the tests
There are not any useful tests right now, but you can run all the tests like this:

```
npm test
```

## Deployment
The site is deployed using heroku. In the app config, two variables are set: `RIOT_API_KEY` and `TWITCH_API_KEY`. These are necessary for the api to function properly. Heroku runs the `heroku-postbuild` script in `package.json` in order to compile the front- and back-end to the `dist/` directory. It then runs `npm start` to run the node server behind `nodemon`.

## Built With
- node.js + express
- react
- webpack + webpack-dev-server + react-hot-reloader
- mocha + chai

## Contributing
There is no formal contribution process. Feel free to send a pull request or open an issue. Pull requests are preferred!

## Authors
Caleb Jares

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
