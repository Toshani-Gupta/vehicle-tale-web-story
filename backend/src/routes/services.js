const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');

// Add a service record to a vehicle
router.post('/:vehicleId', [
  auth,
  body('date').isISO8601(),
  body('type').trim().notEmpty(),
  body('description').trim().notEmpty()
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicleId,
      user: req.user.userId
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Add new service record
    vehicle.services.push(req.body);
    await vehicle.save();

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error adding service record', error: error.message });
  }
});

// Update a service record
router.put('/:vehicleId/:serviceId', [
  auth,
  body('date').optional().isISO8601(),
  body('type').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty()
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicleId,
      user: req.user.userId
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Find and update the service record
    const serviceIndex = vehicle.services.findIndex(
      service => service._id.toString() === req.params.serviceId
    );

    if (serviceIndex === -1) {
      return res.status(404).json({ message: 'Service record not found' });
    }

    // Update service record
    vehicle.services[serviceIndex] = {
      ...vehicle.services[serviceIndex].toObject(),
      ...req.body
    };

    await vehicle.save();
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service record', error: error.message });
  }
});

// Delete a service record
router.delete('/:vehicleId/:serviceId', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicleId,
      user: req.user.userId
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Remove the service record
    vehicle.services = vehicle.services.filter(
      service => service._id.toString() !== req.params.serviceId
    );

    await vehicle.save();
    res.json({ message: 'Service record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service record', error: error.message });
  }
});

module.exports = router; 