
const { Router } = require('express');
const warehouseCrudController = require('../controllers/warehouseCrudController');
const {
  authenticateToken,
  authorizeRoles
} = require('../middleware/authMiddleware');

const router = Router();


router.get(
  '/',
  authenticateToken,
  warehouseCrudController.list
);

router.get(
  '/:id',
  authenticateToken,
  warehouseCrudController.getById
);


router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  warehouseCrudController.create
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  warehouseCrudController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  warehouseCrudController.delete
);

module.exports = router;
