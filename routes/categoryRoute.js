const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post(categoryController.createCategory);
//router.route('/').get(courseController.getAllCourses);
//router.route('/:slug').get(courseController.getCours);

module.exports = router;