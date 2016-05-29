const request = require('request-promise');

async function getStreamerData(name) {
	try {
		let result = await request(`https://api.twitch.tv/kraken/streams/${name}`);
		return JSON.parse(result);
	} catch (err) {
		return err;
	}
}

export default function(app) {
	app.get('/api/streams', (req, res) => {
		res.json({hello: 'world'});
	});

	app.get('/api/streams/:name', async (req, res) => {
		const name = req.params.name;

		res.json(await getStreamerData(name));
	});
};
