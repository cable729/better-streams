import { RIOT_API_KEY } from '../.secrets';
import request from 'request-promise';

function getErrorResponse(err) {
	return {
		error: true,
		status: JSON.parse(err.error).status
	};
}

export default class RiotApi {
	async getSummoner(summonerName) {
		const options = {
			uri: `https://na.api.pvp.net/api/lol/na/v2.2/summoner/by-name/${summonerName}`,
			qs: { api_key: RIOT_API_KEY }
		}
		try {
			const result = await request(options);
			return JSON.parse(result);
		} catch (err) {
			return getErrorResponse(err);
		}
	}
}