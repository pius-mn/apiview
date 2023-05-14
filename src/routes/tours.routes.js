const express = require('express')
const router = express.Router()
const ProductController =   require('../controllers/tours.controller');
// Retrieve all employees
router.get('/', ProductController.findAll);
// Create a new employee
router.post('/', ProductController.create);
// Retrieve a single employee with id
router.get('/:id', ProductController.findById);
// Update a employee with id
router.put('/:id', ProductController.update);
// Delete a employee with id
router.delete('/:id', ProductController.delete);
module.exports = router