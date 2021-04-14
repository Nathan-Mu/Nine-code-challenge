const express = require('express');

const router = express.Router();

router.post('', (req, res) => {
	if (!req.body.payload || !Array.isArray(req.body.payload)) {
		const error = 'Could not resolve request: Invalid Data';
		res.status(400).send({ error });
	}
	const response = req.body.payload
		.filter(item => item.drm && item.episodeCount > 0)
		.map(item => {
			const image = item.image ? item.image.showImage : undefined;
			const slug = item.slug;
			const title = item.title;
			return { image, slug, title };
		});
	res.send({ response });
});

module.exports = router;
