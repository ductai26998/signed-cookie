var bcrypt = require('bcrypt');
var db = require('../db');

module.exports.login = (request, response) => {
	response.render('auth/login');
};

module.exports.postLogin = async (request, response) => {
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

  const match = await bcrypt.compare(password, user.password);
  console.log(match);

  if (!match) {
    user.wrongLoginCount++;
    response.render('auth/login', {
      errors: function() {
        if (user.wrongLoginCount >= 4) {
          return ['You have entered too many wrong passwords!'] ;
        } else {
          return ['Password wrong'];
        }
      },
      values: request.body
    });
    return;
  }

	response.cookie("userId", user.id, {
    signed: true
  });
  response.redirect('/transactions');
};