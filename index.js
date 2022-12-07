const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
app.listen(3000, () => {
	console.log('app is listening to port 3000');
});
