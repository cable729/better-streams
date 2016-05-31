import SummonerService from './SummonerService';
import StreamService from './StreamService';
import streamerMap from '../data/streamerMap';

export default class LeagueStreamerService {
	constructor() {
		this.summonerService = new SummonerService();
		this.streamService = new StreamService();
	}

	async getSummonerNamesForStreamer(streamerName) {
		const matchedStreamer = streamerMap[streamerName];

		if (!matchedStreamer) {
			// take a guess at their name!
			return [streamerName];
		}

		return matchedStreamer.map(x => x.name);
	}

	async getCurrentGameForStreamer(streamerName) {
		const summonerNames = await this.getSummonerNamesForStreamer(streamerName);
		
		let game = null;

		for (let name of summonerNames) {
			game = await this.summonerService.getCurrentGameBySummonerName(name);
			// Assume that streamers aren't playing on multiple accounts at the same time
			if (game) return game;
		}

		return game;
	}

	async getStreamAndGameInfoForStreamer(streamerName) {
		const streamInfo = await this.streamService.getStreamerInfo(streamerName);
		const gameInfo = await this.getCurrentGameForStreamer(streamerName);

		return {
			stream: streamInfo,
			currentGame: gameInfo
		};
	}
}
