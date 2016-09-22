
// grab dependencies
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8080;

// configure application

// set routes
app.use(require('./app/routes'));

// start server
app.listen(port, () => {
    console.log(`App listening on http://node-crud:${port}`);
});