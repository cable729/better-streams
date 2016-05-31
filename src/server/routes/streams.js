import LeagueStreamerService from '../services/LeagueStreamerService';

export default function(app) {
	app.get('/api/streams/:name', async (req, res) => {
		const name = req.params.name;
		const leagueStreamerService = new LeagueStreamerService();

		res.json(await leagueStreamerService.getStreamAndGameInfoForStreamer(name));
	});
};
