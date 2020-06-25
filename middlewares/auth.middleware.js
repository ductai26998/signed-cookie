var db = require('../db');

module.exports.requireAuth = (request, response, next) => {
	var user = db.get('users').find({id: request.cookies.userId}).value();

	if (!request.cookies.userId) {
		response.redirect('auth/login');
		return;
	}

	if (!user) {
  		response.redirect('auth/login', {
  			errors: ['User does not exist!'],
  			values: request.body
  		});
		return;
	}

	next();
}