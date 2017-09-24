const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));


// GET /users
// Get a list of users
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    res.json(users);
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function (req, res) {
  User.findOne({
    _id: req.params.id
  }, function (err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});

// Post /users
// Create a user wit POST
router.post('/', function (req, res) {
  User.create(req.body, function (err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error adding user: " + err
      });
    }

    res.json(users);
  });
});

// DELETE /user/:id
// DELETE a user by ID
router.delete('/:id', function (req, res) {
  User.remove({ _id: req.params.id, }, function (err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error deleting user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});



module.exports = router;


exports.create = {

  auth: false,

  handler: function (request, reply) {
    const user = new User(request.payload);
    user.save().then(newUser => {
      reply(newUser).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error creating candidate'));
    });
  },

};

exports.deleteAll = {

  auth: false,

  handler: function (request, reply) {
    User.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing candidates'));
    });
  },

};

router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    res.json(users);
  });
});


exports.deleteOne = {

  auth: false,

  handler: function (request, reply) {
    User.remove({_id: request.params.id}).then(user => {
      reply(user).code(204);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};