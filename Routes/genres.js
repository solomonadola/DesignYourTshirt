const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Genre } = require('../models/vidly');
const auth = require('../middleware/auth');
router.get('/', async (req, res) => {
	const genres = await Genere.find();
	console.log(genres);
	res.send(genres);
});
router.get('/:id', async (req, res) => {
	const genre = await Genere.findById(req.params.id);
	if (genre) res.send(genre);
	res.status(400).send('request was not found');
});
router.post('/', auth, async (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) res.status(404).send(error.details[0].message);

	const addgenre = new Genre({
		name: req.body.name,
	});
	addgenre.save();
	res.status(200).send(addgenre);
});
router.put('/:id', auth, async (req, res) => {
	// const { error } = validateGenre(req.body.id);
	// if (error) res.status(404).send(error.details[0].message);
	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{ category: req.body.category },
		{ new: true }
	);
	// genre.save();
	res.status(200).send(genre);
});
router.delete('/:id', auth, async (req, res) => {
	// const { error } = validateCourse(req.body.category);
	// if (error) res.status(404).send(error.details[0].message);
	const genre = await Genre.findByIdAndDelete(req.params.id);
	res.send(genre);
});

function validateGenre(course) {
	const schema = Joi.object({
		name: Joi.string().required().min(3),
	});
	return schema.validate({ name: course.name });
}
module.exports = router;
