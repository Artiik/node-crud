
const Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    showCreate: showCreate,
    processCreate: processCreate,
    showEdit: showEdit,
    processEdit: processEdit,
    deleteSingle: deleteSingle
};

/**
 * Show all events
 */
function showEvents(req, res) {
    //get all events
    Event.find({}, (err, events) => {
        if (err || !events) {
            res.status(404);
            res.send('Events not found!');
        }

        // return a view with data
        res.render('pages/events', {
            events: events,
            success: req.flash('success')
        });
    });
}

/**
 * show single event
 */
function showSingle(req, res) {
    //get single event
    Event.findOne({ slug: req.params.slug }, (err, event) => {
        if (err || !event) {
            res.status(404);
            res.send('Event not found!');
        }

        res.render('pages/single', {
            event: event,
            success: req.flash('success')
        });
    });
}

/**
 * seed the database
 */
function seedEvents(req, res) {
    const events = [
        { name: 'Basketball', description: 'Throw into basket'},
        { name: 'Swimming', description: 'Swimming like a pro'},
        { name: 'Weightlifting', description: 'Get that thing'},
        { name: 'Ping Pong', description: 'Super fast'}
    ];

    Event.remove({}, () => {
        for (event of events) {
            var newEvent = new Event(event);
            newEvent.save();
        }
    });

    res.send('Database seeded!');
}

/**
 * Show the create form
 */
function showCreate(req, res) {
    res.render('pages/create', {
        errors: req.flash('errors')
    });
}

/**
 * Process the creation form
 */
function processCreate(req, res) {
    // validate info =====================================
    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('description', 'Description is required.').notEmpty();

    // if errors redirect and save errors to flash
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect('/events/create');
    }

    // create a new event ===============================
    const event = new Event({
        name: req.body.name,
        description: req.body.description
    });

    // save event
    event.save((err) => {
        if (err)
            throw err;

        // set a successful flash message
        req.flash('success', 'Successfully created event!');

        // redirect to a newly created event
        res.redirect(`/events/${event.slug}`);
    });
}

/**
 * Show edit form
 */
function showEdit(req, res) {
    Event.findOne({ slug: req.params.slug }, (err, event) => {
        if (err || !event) {
            res.status(404);
            res.send('Event not found!');
        }
        res.render('pages/edit', {
            event: event,
            errors: req.flash('errors')
        });
    });
}

/**
 * Process edit form
 */
function processEdit(req, res) {
     // validate info =====================================
    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('description', 'Description is required.').notEmpty();

    // if errors redirect and save errors to flash
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect(`/events/${req.params.slug}/edit`);
    }

    // find current event
    Event.findOne({ slug: req.params.slug }, (err, event) => {
        // update event
        event.name        = req.body.name;
        event.description = req.body.description;

        event.save((err) => {
            if (err)
                throw err;

            // success flash
            req.flash('success', 'Successfully updated event!');

            // redirect user back to /events
            res.redirect('/events');
        });
    });
}

/**
 * Delete single event
 */
function deleteSingle(req, res) {
    Event.remove({ slug: req.params.slug }, (err) => {
        // set flash data
        req.flash('success', 'Event deleted!');
        // redirect back to the events page
        res.redirect('/events');
    });
}
