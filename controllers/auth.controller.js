var md5 = require('md5');
var db = require('../db');

module.exports.login = (request, response) => {
	response.render('auth/login');
};

module.exports.postLogin = (request, response) => {
	var email = request.body.email;
	var password = request.body.password;
  var user = db.get('users').find({email: email}).value();

  if (!user) {
  	response.render('auth/login', {
  		errors: ['User does not exist!'],
  		values: request.body
  	});
  	return;
  }

  var hashedPassword = md5(password);
	if (user.password !== hashedPassword) {
	  response.render('auth/login', {
  		errors: ['Password wrong!'],
  		values: request.body
  	});
  	return;
	}

	response.cookie("userId", user.id);
  response.redirect('/transactions');
};