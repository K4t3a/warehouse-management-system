
const { Router } = require('express');
const warehouseController = require('../controllers/warehouseController');
const {
  authenticateToken,
  authorizeRoles
} = require('../middleware/authMiddleware');

const router = Router();

router.get(
  '/stock',
  authenticateToken,
  warehouseController.getStock
);

router.post(
  '/receive',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'storekeeper'),
  warehouseController.receive
);

router.post(
  '/write-off',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'storekeeper'),
  warehouseController.writeOff
);

router.post(
  '/reserve',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'storekeeper'),
  warehouseController.reserve
);

router.post(
  '/release',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'storekeeper'),
  warehouseController.releaseReservation
);

router.post(
  '/inventory',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'storekeeper'),
  warehouseController.inventory
);

module.exports = router;
