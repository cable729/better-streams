import request from 'request-promise';

const TWITCH_API_KEY = process.env.TWITCH_API_KEY;

export default class TwitchApi {
	async getStreamerInfo(name) {
		try {
			const result = await request(`https://api.twitch.tv/kraken/streams/${name}`);
			return JSON.parse(result);
		} catch (err) {
			return err;
		}
	}
}
