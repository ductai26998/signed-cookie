var db = require('../db');

module.exports.requireAuth = (request, response, next) => {
	var user = db.get('users').find({id: request.signedCookies.userId}).value();

	if (!request.signedCookies.userId) {
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

	response.locals.user = user;

	next();
}