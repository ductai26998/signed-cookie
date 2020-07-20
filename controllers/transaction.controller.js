var db = require('../db');
const shortid = require('shortid');

module.exports.get = (request, response) => {
  response.render('transactions/index', {
    transactions: function(){
      var userLogin = db.get('users').find({id: request.signedCookies.userId}).value();
      console.log(userLogin);
      if (userLogin.isAdmin === "true") {
        return db.get('transactions').value();
      } else {
        return db.get('transactions').filter({userId: request.signedCookies.userId}).value();
      }
    },
    getUserById: function(userId) {
      return db.get('users').find({ id: userId }).value();
    },
    getBookById: function(bookId) {
      return db.get('books').find({ id: bookId }).value();
    }
  });
};

module.exports.create = (request, response) => {
  response.render("transactions/create", {
    users: db.get('users').value(),
    books: db.get('books').value()
  })
};

module.exports.postCreate = (request, response) => {
  request.body.id = shortid.generate();
  request.body.isComplete = "false";
  db.get('transactions').push(request.body).write();
  response.redirect('/transactions');
};

module.exports.complete = (request, response) => {
  var id = request.params.id;
  var error = '';
  for (var transaction of db.get('transactions')) {
    if (transaction.id === id) {
      if (db.get('transactions').find({id: id}).value().isComplete === "true") {
        error = 'Transaction was completed !';
        response.render('transactions/index', {
          error: error,
          transactions: db.get('transactions').value(),
          getUserById: function(userId) {
            return db.get('users').find({ id: userId }).value();
          },
          getBookById: function(bookId) {
            return db.get('books').find({ id: bookId }).value()
          }
        });
      }
      response.render('transactions/complete', {
        id: request.params.id,
        error: error
      });
    } else {
      error = 'Transaction is invalid !';
    }
  }
  if (error) {
    response.render('transactions/index', {
      error: error,
      transactions: db.get('transactions').value(),
      getUserById: function(userId) {
        return db.get('users').find({ id: userId }).value();
      },
      getBookById: function(bookId) {
        return db.get('books').find({ id: bookId }).value()
      }
    });
  }
};

module.exports.postComplete = (request, response) => {
  var id = request.params.id;
  db.get('transactions')
    .find({id: id})
    .assign({isComplete: request.body.isComplete})
    .write();
  response.redirect('/transactions');
};

