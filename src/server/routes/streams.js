import LeagueStreamerService from '../services/LeagueStreamerService';
import TwitchApi from '../data/TwitchApi';
import StreamService from '../services/StreamService';

export default function(app) {
	app.get('/api/streams/:name', async (req, res) => {
		const name = req.params.name;
		const leagueStreamerService = new LeagueStreamerService();

		res.json(await leagueStreamerService.getStreamAndGameInfoForStreamer(name));
	});

	app.get('/api/streams/game/:name', async (req, res) => {
		const name = req.params.name;
		const streamService = new StreamService();
		const streams = await streamService.getCurrentTopStreamersInfo(name);

		res.json(streams);
	});

	app.get('/api/streams', async (req, res) => {
		const leagueStreamerService = new LeagueStreamerService();
		const streams = await leagueStreamerService.getGamesForCurrentTopStreamers();
		res.json(streams);
	});
};
