const request = require('request-promise');
import Streamer from '../data/Streamer';
import { RIOT_API_KEY } from '../.secrets';

async function getSummonerCurrentInfo(streamerName) {
	const summonerId = new Streamer().getSummonerId(streamerName);
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

async function getStreamerData(name) {
	try {
		const result = await request(`https://api.twitch.tv/kraken/streams/${name}`);
		return JSON.parse(result);
	} catch (err) {
		return JSON.parse(err.error);
	}
}

function getParticipantByStreamer(participants, streamerName) {
	const summonerId = new Streamer().getSummonerId(streamerName);

	return participants.find(x => x.summonerId === summonerId);
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

			const gameInfo = await getSummonerCurrentInfo(name);

			if (gameInfo && gameInfo.gameId) {
				const participant = getParticipantByStreamer(gameInfo.participants, name);

				response.game = {
					startTime: gameInfo.gameStartTime,
					gameMode: gameInfo.gameMode,
					gameType: gameInfo.gameType,
					championId: participant.championId
				};
			}
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

		res.json(await getSummonerCurrentInfo(name));
	})
};
