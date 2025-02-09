const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create({ ...req.body, organizer: req.userId });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer');
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
