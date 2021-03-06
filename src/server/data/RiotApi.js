import request from 'request-promise';

function getErrorResponse(err) {
	return {
		error: true,
		status: JSON.parse(err.error).status
	};
}

export default class RiotApi {
	constructor() {
		this.RIOT_API_KEY = process.env.RIOT_API_KEY;
	}

	async getSummoner(summonerName) {
		const options = {
			uri: `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${summonerName}`,
			qs: { api_key: this.RIOT_API_KEY }
		}
		try {
			const result = await request(options);
			return JSON.parse(result);
		} catch (err) {
			return getErrorResponse(err);
		}
	}

	async getGameForSummonerId(summonerId) {
		const options = {
			uri: `https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/${summonerId}`,
			qs: { api_key: this.RIOT_API_KEY }
		}
		try {
			const result = await request(options);
			return JSON.parse(result);
		}	catch (err) {
			return getErrorResponse(err);
		}	
	}
}
