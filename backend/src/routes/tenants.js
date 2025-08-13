const express = require('express');
const router = express.Router();
const {
  getAllTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
} = require('../controllers/tenantController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// All routes in this file are protected and restricted to platform admins
router.use(protect);
router.use(restrictTo('Platform Super Admin', 'Platform Manager'));

router.route('/')
  .get(getAllTenants)
  .post(createTenant);

router.route('/:id')
  .get(getTenantById)
  .put(updateTenant)
  .delete(deleteTenant);

module.exports = router;
