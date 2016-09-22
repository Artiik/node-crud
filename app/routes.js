
// create a new express router
const express = require('express'),
      router = express.Router(),
      mainController = require('./controllers/main.controller'),
      eventsController = require('./controllers/events.controller');

// export router
module.exports = router;

// define routes
router.get('/', mainController.showHome);

// event routes
router.get('/events',       eventsController.showEvents);
router.get('/events/:slug', eventsController.showSingle);
