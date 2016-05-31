import { TWITCH_API_KEY } from '../secrets';
import request from 'request-promise';

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
