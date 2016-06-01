import TwitchApi from '../data/TwitchApi';

function getFormattedStreamerInfo(stream) {
	return {
		name: stream.channel.display_name,
		title: stream.channel.status,
		startTime: stream.created_at,
		viewers: stream.viewers,
		videoHeight: stream.video_height,
		delay: stream.delay,
		averageFps: stream.average_fps,
		previewTemplate: stream.preview.template
	};
}

export default class StreamService {
	constructor() {
		this.api = new TwitchApi();
	}

	async getStreamerInfo(streamerName) {
		const res = await this.api.getStreamerInfo(streamerName);

		if (res.statusCode) {
			if (res.statusCode === 422 || res.statusCode === 404) {
				// channel does not exist
				return null;
			}
			throw Error(`Unable to connect to Twitch API. Resulted in error code ${res.statusCode}`);
		}

		return getFormattedStreamerInfo(res.stream);
	}

	async getCurrentTopStreamersInfo(gameName) {
		const res = await this.api.getStreamsByGame(gameName);

		if (res.statusCode) {
			throw Error(`Unable to connect to Twitch API. Resulted in error code ${res.statusCode}`);
		}

		// return res.streams;
		return res.streams.map(x => getFormattedStreamerInfo(x));
	}
}