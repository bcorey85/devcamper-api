const express = require('express');
const {
	getBootcamp,
	getBootcamps,
	getBootcampsInRadius,
	createBootcamp,
	updateBootcamp,
	deleteBootcamp,
	bootcampPhotoUpload
} = require('../controllers/bootcamps');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const Bootcamp = require('../models/Bootcamp');

//Include other resource routers
const courseRouter = require('./courses');

//Reroute into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
	.route('/:id')
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp);

router
	.route('/')
	.get(advancedResults(Bootcamp, 'courses'), getBootcamps)
	.post(createBootcamp);

module.exports = router;
