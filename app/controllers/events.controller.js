
module.exports = {
    showEvents: (req, res) => {
        const events = [
            { name: 'Basketball', slug: 'basketball', description: 'Throw into basket'},
            { name: 'Swimming', slug: 'swimming', description: 'Swimming like a pro'},
            { name: 'Weightlifting', slug: 'weightlifting', description: 'Get that thing'}
        ];

        res.render('pages/events', { events: events });
    },
    showSingle: (req, res) => {
        const event = { name: 'Basketball', slug: 'basketball', description: 'Throw into basket'};

        res.render('pages/single', { event: event });
    }
};