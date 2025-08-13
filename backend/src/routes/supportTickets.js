const express = require('express');
const router = express.Router();
const { getAllSupportTickets } = require('../controllers/supportTicketController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// All routes in this file are protected and restricted to platform admins
router.use(protect);
router.use(restrictTo('Platform Super Admin', 'Platform Manager'));

router.route('/')
  .get(getAllSupportTickets);

module.exports = router;
