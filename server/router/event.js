const express = require('express');
const router = express.Router();
const eventController=require('../controller/calender')
//  routes

router.post('/events/', eventController.createEvent);
router.get('/events/', eventController.getEvents);
router.put('/update_event/', eventController.updateEvent);
router.delete('/delete_event/', eventController.deleteEvent);

module.exports = router;
            