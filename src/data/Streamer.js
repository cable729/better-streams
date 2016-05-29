const streamerToSummoner = {
	'aphromoo': 442232,
	'nightblue3': 76423200
}

export default class Streamer {
	getSummonerId(streamerName) {
		return streamerToSummoner[streamerName];
	}
}
