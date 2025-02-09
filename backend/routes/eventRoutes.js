const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createEvent);
router.get('/', getAllEvents);

module.exports = router;
