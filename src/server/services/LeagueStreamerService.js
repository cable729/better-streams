import SummonerService from './SummonerService';
import StreamService from './StreamService';

export default class LeagueStreamerService {
	constructor() {
		this.summonerService = new SummonerService();
		this.streamService = new StreamService();
	}

	async getSummonerNameForStreamer(streamerName) {
		// dumb for now
		return streamerName;
	}

	async getCurrentGameForStreamer(streamerName) {
		const summonerName = await this.getSummonerNameForStreamer(streamerName);

		return await this.summonerService.getCurrentGameBySummonerName(summonerName);
	}

	async getStreamAndGameInfoForStreamer(streamerName) {
		const streamInfo = await this.streamService.getStreamerInfo(streamerName);
		const gameInfo = await this.getCurrentGameForStreamer(streamerName);

		return {
			stream: streamInfo,
			game: gameInfo
		};
	}
}
