import TwitchApi from '../data/TwitchApi';

function getFormattedStreamerInfo(info) {
	if (info.stream === null) return null;

	return {
		title: info.stream.channel.status,
		startTime: info.stream.created_at,
		viewers: info.stream.viewers,
		videoHeight: info.stream.video_height,
		delay: info.stream.delay,
		averageFps: info.stream.average_fps,
		previewTemplate: info.stream.preview.template
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

		return getFormattedStreamerInfo(res);
	}
}