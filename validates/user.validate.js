module.exports.postCreate = function(request, response, next) {
	var errors = [];
	if (request.body.name.length > 30) {
	  errors.push('Name is invalid (the max length is 30 charactors) !');
	}
	if (!request.body.name) {
	  errors.push('Name is required !');
	}
	if (!request.body.phone) {
	  errors.push('Phone is required !');
	}
	if (errors.length) {
	  response.render('users/create', {
	    errors: errors,
	    values: request.body
	  });
	  return;
	}
	
	next();
};