import RiotApi from '../data/RiotApi';

function getFormattedGameInfo(gameInfo, summonerId) {
	const participant = gameInfo.participants.find(x => x.summonerId === summonerId);

	return {
		startTime: gameInfo.gameStartTime,
		gameMode: gameInfo.gameMode,
		gameType: gameInfo.gameType,
		championId: participant.championId
	};
}

export default class SummonerService {
	constructor() {
		this.api = new RiotApi();
	}

	async getSummonerId(summonerName) {
		const res = await this.api.getSummoner(summonerName);

		// todo: check for type of error
		if (res.error) return undefined;

		return res[summonerName].id;
	}

	async getCurrentGameBySummonerId(summonerId) {
		const id = parseInt(summonerId);
		if (id === NaN) {
			throw Error(`Summoner ID was not a number. Was given '${summonerId}'`);
		}

		const res = await this.api.getGameForSummonerId(id);

		// todo: check for type of error
		if (res.error) return null;

		return getFormattedGameInfo(res, id);
	}

	async getCurrentGameBySummonerName(summonerName) {
		const id = await this.getSummonerId(summonerName);

		// todo: check for type of error
		if (!id) return null;

		return await this.getCurrentGameBySummonerId(id);
	}
}