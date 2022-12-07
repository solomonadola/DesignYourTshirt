const { string, array } = require('joi');
const mongoose = require('mongoose');
mongoose
	.connect('mongodb://localhost:27017/testGround', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		family: 4,
	})
	.then(() => console.log('connection created successfully'))
	.catch((err) => console.log('something bad happened', err));

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: {
		type: Date,
		default: Date.now(),
	},
	isPublished: Boolean,
});

const Course = new mongoose.model('Course', courseSchema);
async function saveCourse() {
	const course = new Course({
		name: 'Node',
		author: 'Sol',
		tags: ['backend', 'node'],
		isPublished: true,
	});
	const result = await course.save();
	console.log(result);
}
// saveCourse();
async function getCourse() {
	const course = await Course.find({
		isPublished: true,
	})
		.sort({ name: 1 })
		.select({ name: 1, author: 1 });
	console.log(course);
}
getCourse();

async function updateDoc() {
	const result = await Course.update(
		{ author: 'Sol' },
		{
			$set: {
				author: 'solomon',
			},
		}
	);
	console.log(result);
}
updateDoc();
