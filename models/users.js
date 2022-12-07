const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 6,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 1024,
	},
});
userSchema.methods.getAuthToken = function () {
	return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
};

const User = mongoose.model('User', userSchema);

function validateSchema(body) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().email().min(3),
		password: Joi.string().min(6).max(1024).required(),
	});

	return schema.validate({
		name: body.name,
		email: body.email,
		password: body.password,
	});
}

exports.User = User;
exports.validateSchema = validateSchema;
