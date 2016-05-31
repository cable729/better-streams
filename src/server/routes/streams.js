const request = require('request-promise');
import { RIOT_API_KEY } from '../.secrets';
import streamerMap from '../data/streamerMap';
import RiotApi from '../data/RiotApi';
import SummonerService from '../services/SummonerService';

async function getGameForSummonerId(summonerId) {
	const options = {
		uri: `https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/${summonerId}`,
		qs: { api_key: RIOT_API_KEY }
	}
	try {
		const result = await request(options);
		return JSON.parse(result);
	}	catch (err) {
		return JSON.parse(err.error);
	}	
}

function getFormattedGameInfo(gameInfo, summonerId) {
	const participant = gameInfo.participants.find(x => x.summonerId === summonerId);

	return {
		startTime: gameInfo.gameStartTime,
		gameMode: gameInfo.gameMode,
		gameType: gameInfo.gameType,
		championId: participant.championId
	};
}

async function getCurrentGameInfoForStreamer(name) {
	const summonerIds = streamerMap[name];
	if (!summonerIds) return null;

	for (let id of summonerIds) {
		const game = await getGameForSummonerId(id);
		if (game && game.gameId) {
			return getFormattedGameInfo(game, id);
		}
	}

	return null;
}

async function getStreamerData(name) {
	try {
		const result = await request(`https://api.twitch.tv/kraken/streams/${name}`);
		return JSON.parse(result);
	} catch (err) {
		return JSON.parse(err.error);
	}
}

async function getStreamerAndCurrentGameInfo(name) {
	try {
		let response = {
			stream: null,
			game: null
		};

		const streamerInfo = await getStreamerData(name);
		if (streamerInfo && streamerInfo.stream) {
			response.stream = {
				userName: name,
				title: streamerInfo.stream.channel.status,
				startTime: streamerInfo.stream.created_at,
				viewers: streamerInfo.stream.viewers,
				videoHeight: streamerInfo.stream.video_height,
				delay: streamerInfo.stream.delay,
				averageFps: streamerInfo.stream.average_fps,
				previewTemplate: streamerInfo.stream.preview.template
			};

			const gameInfo = await getCurrentGameInfoForStreamer(name);

			response.game = gameInfo;
		}

		return response;
	} catch (err) {
		return err;
	}
}

export default function(app) {
	app.get('/api/streams', (req, res) => {
		res.json({hello: 'world'});
	});

	app.get('/api/streams/:name', async (req, res) => {
		const name = req.params.name;

		res.json(await getStreamerAndCurrentGameInfo(name));
	});

	// comment this out before deploying!
	app.get('/api/streams/:name/info', async (req, res) => {
		const name = req.params.name;

		res.json(await getStreamerData(name));
	});

	// comment this out before deploying!
	app.get('/api/streams/:name/game', async (req, res) => {
		const name = req.params.name;

		res.json(await getCurrentGameInfoForStreamer(name));
	})
	
	app.get('/api/summoners/:id/game', async (req, res) => {
		const id = req.params.id;

		res.json(await getGameForSummonerId(id));
	});

	app.get('/api/summoners/:name', async (req, res) => {
		const name = req.params.name;
		const api = new RiotApi();

		res.json(await api.getSummoner(name));
	});

	app.get('/api/summoners/:name/id', async (req, res) => {
		const name = req.params.name;
		const summonerService = new SummonerService();

		let id = await summonerService.getSummonerId(name);

		res.json(id);
	});
};
