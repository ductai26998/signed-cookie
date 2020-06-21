var express = require('express');
var controller = require('../controllers/user.controller');
var validate = require('../validates/user.validate')

var router = express.Router();

// https://expressjs.com/en/starter/basic-routing.html
router.get("/", controller.get);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate);

router.get("/:id/delete", controller.delete);

router.get('/:id/update', controller.update);

router.post('/:id/update', controller.postUpdate);

module.exports = router;
