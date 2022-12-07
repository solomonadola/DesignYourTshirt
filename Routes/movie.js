const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Genre = require('../models/vidly');
const auth = require('../middleware/auth');
router.post('/', auth, async (req, res) => {
	const movie = new Movie({
		title: req.body.title,
		genre: req.body.genre,
		numberInStock: 0,
		dailyRent: 0,
	});
	const resu = await movie.save();
	res.status(200).send(resu);
	console.log(resu);
});
module.exports = router;
