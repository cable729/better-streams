import request from 'request-promise';

export default class TwitchApi {
	constructor() {
		this.TWITCH_API_KEY = process.env.TWITCH_API_KEY;
	}

	async getStreamerInfo(name) {
		try {
			const result = await request(`https://api.twitch.tv/kraken/streams/${name}`);
			return JSON.parse(result);
		} catch (err) {
			return err;
		}
	}

	async getStreamsByGame(name) {
		try {
			const result = await request(`https://api.twitch.tv/kraken/streams/?game=${name}`);
			return JSON.parse(result);
		} catch (err) {
			return err;
		}
	}
}
