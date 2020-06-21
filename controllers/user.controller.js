var db = require('../db');
const shortid = require('shortid');

module.exports.get = (request, response) => {
  response.render('users/index', {
    users: db.get('users').value()
  });
};

module.exports.search = (request, response) => {
  var q = request.query.q;
  var matchedUsers = db.get('users').value().filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  response.render('users/index', {
    users: matchedUsers
  });
};

module.exports.create = (request, response) => {
  response.render('users/create');
}

module.exports.postCreate = (request, response) => {
  request.body.id = shortid.generate();
  db.get('users').push(request.body).write();
  response.redirect('/users');
};

module.exports.delete = (request, response) => {
  // var id = request.params.id;
  db.get('users').remove(request.params).write();
  response.redirect('/users');
};

module.exports.update = (request, response) => {
  response.render('users/update', {id: request.params.id});
};

module.exports.postUpdate = (request, response) => {
  var userId = request.params.id;
  db.get('users')
    .find({id: userId})
    .assign({name: request.body.name})
    .write();
  response.redirect('/users');
};