const auth = require('../middleware/auth');
const { User, validateSchema } = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const saltRounds = 10;

router.get('/me', auth, async (req, res) => {
	// console.log(req.user._id);
	const user = await User.findById(req.user._id).select('-password');
	res.status(200).send(user);
});
router.post('/register', async (req, res) => {
	const { error } = validateSchema(req.body);
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('email already exist');
	if (error) return res.status(400).send(error.message);
	const salt = await bcrypt.genSalt(10);
	const hashed = await bcrypt.hash(req.body.password, salt);
	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	user.password = hashed;
	user.save();
	const token = user.getAuthToken();
	return res
		.header('x-auth-token', token)
		.status(200)
		.send(_.pick(user, ['name', 'email', 'password']));
});

module.exports = router;
