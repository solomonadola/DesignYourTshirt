const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: 'first pug app',
		header: 'hello ther this is the header for our pug',
	});
});

module.exports = router;
