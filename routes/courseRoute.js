const express = require('express');
const courseController = require('../controller/courseController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/').post(roleMiddleware(["Teacher", "Admin"]), courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);

module.exports = router;