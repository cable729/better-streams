import RiotApi from '../data/RiotApi';

export default class SummonerService {
	constructor() {
		this.api = new RiotApi();
	}

	async getSummonerId(summonerName) {
		const res = await this.api.getSummoner(summonerName);

		if (res.error) return undefined;

		return res[summonerName].summonerId;
	}
}