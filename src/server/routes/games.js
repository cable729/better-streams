import RiotApi from '../data/RiotApi';
import SummonerService from '../services/SummonerService';

export default function(app) {
	// Comment these routes out in production!
	// Otherwise your riot api key will leak on errors


	// app.get('/api/summoners/raw/:name', async (req, res) => {
	// 	const name = req.params.name;
	// 	const api = new RiotApi();

	// 	res.json(await api.getSummoner(name));
	// });
	// app.get('/api/summoners/raw/:name/id', async (req, res) => {
	// 	const name = req.params.name;
	// 	const summonerService = new SummonerService();

	// 	res.json(await summonerService.getSummonerId(name));
	// });
};
