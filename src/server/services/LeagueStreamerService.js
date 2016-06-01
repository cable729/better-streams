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
			// comment this out in production
			// console.log(`Searching game info for ${streamerName} by summoner: '${name}'`);
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

	async getGamesForCurrentTopStreamers() {
		const streams = await this.streamService.getCurrentTopStreamersInfo('League of Legends');
		
		let info = [];

		for (let stream of streams) {
			const gameInfo = await this.getCurrentGameForStreamer(stream.name);
			info = [...info, {
				stream: stream,
				gameInfo: gameInfo
			}];
		}

		return info;
	}
}
