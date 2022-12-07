const mongoose = require('mongoose');

module.exports = function () {
	mongoose
		.connect('mongodb://localhost:27017/vidly', {
			family: 4,
		})
		.then(() => console.log('connected successfully'))
		.catch((err) => console.log('somethign went bad', err));
};
