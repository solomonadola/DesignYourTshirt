console.log('welcome getting customer...');
// getCustomer(1, (customer) => {
// 	console.log('we have got a customer ', customer.name);
// 	getMovies((movies) => {
// 		console.log('getting movie...');
// 		sendEmail(customer.email, movies, () => {
// 			console.log('email sent to customer....');
// 		});
// 	});
// });

//promise version
// getCustomer(1).then((customer) =>
// 	getMovies().then((movies) => sendEmail(customer.email, movies))
// );

//async await

async function notifyCustomer() {
	const customer = await getCustomer(1);
	if (customer.isGold) {
		getTopmovies();
	}
	const movie = await getMovies();
	const send = await sendEmail(customer.email, movie);
}

notifyCustomer();

function getTopmovies() {
	return new Promise((resolve, reject) => {
		console.log('here we have some top movies for you');
	});
}

function getCustomer(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				id: 1,
				name: 'Solomon Adola',
				isGold: true,
				email: 'sol@gm.com',
			});
			console.log('we have got a customer ');
		});
	}, 2000);
}
function getMovies() {
	return new Promise((resolve, reject) => {
		console.log('getting movie...');

		setTimeout(() => {
			resolve(['movie1', 'movie2']);
		}, 2000);
	});
}
function sendEmail(email, movie) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(email);
		}, 2000);
		console.log('email sent to customer....');
	});
}
