const { User } = require('../models/users');
describe('this is going to test user model for vidly app', () => {
	it('should return valid json web token for logged in user', () => {
		expect(User.getAuthToken()).toBe(10);
	});
});
