const express = require('express');
const homeRouter = require('../Routes/home');
const userRouter = require('../Routes/users');
const movieRouter = require('../Routes/movie');
const genreRouter = require('../Routes/genres');
const authRouter = require('../Routes/auth');
module.exports = function (app) {
	app.set('view engine', 'pug');
	app.set('views', './views');
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static('public'));
	app.use('/', homeRouter);
	app.use('/api/genres', genreRouter);
	app.use('/api/movies', movieRouter);
	app.use('/api/users', userRouter);
	app.use('/api/auth', authRouter);
};
