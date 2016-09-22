
// grab dependencies
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8080,
      expressLayouts = require('express-ejs-layouts');

// configure application
// set static assets folder
app.use(express.static(__dirname + '/public'));

// set templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// set routes
app.use(require('./app/routes'));

// start server
app.listen(port, () => {
    console.log(`App listening on http://node-crud:${port}`);
});