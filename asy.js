console.log('before');

//using promises
// getuser(1).then((user) =>
// 	getRepo(user.gihubUsername).then((result) => console.log(result))
// );

//using async await
async function displaycommits() {
	try {
		const user = await getuser(1);
		const repo = await getRepo(user.Username);
		console.log(repo);
	} catch (error) {
		console.log(error);
	}
}

displaycommits();

console.log('after');

function getuser(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('it has finished operation after two sec');
			resolve({ id: id, Username: 'sol' });
		}, 2000);
	});
}
function getRepo(username) {
	return new Promise((resolve, reject) => {
		console.log('fetching repo');
		setTimeout(() => {
			// resolve(['repo1', 'repo2', 'repo3']);
			reject(new Error('cant process this operation something went bad'));
		}, 2000);
	});
}

// function testprom() {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve(
// 				'hello this message is going to be printed for reject simulation'
// 			);
// 		}, 5000);
// 	});
// }

// testprom()
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch(function (err) {
// 		console.log(err);
// 	});
