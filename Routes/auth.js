const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/users');

const router = express.Router();
const saltRounds = 10;

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('invalid email or password');
	console.log(user);
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('invalid email or password');
	const token = user.getAuthToken();
	return res
		.status(200)
		.send(`welcome you are logged in as ${user.name} ${token}`);
});
function validate(body) {
	const schema = Joi.object({
		email: Joi.string().email().min(3),
		password: Joi.string().min(6).max(1024).required(),
	});

	return schema.validate({
		email: body.email,
		password: body.password,
	});
}

module.exports = router;
