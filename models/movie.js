const mongoose = require('mongoose');

const { genreSchema } = require('./vidly');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 255,
	},
	genre: { type: genreSchema, required: true },
	numberInStock: { type: Number, required: true },
	dailyRent: { type: Number, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
