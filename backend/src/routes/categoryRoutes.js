
const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const {
  authenticateToken,
  authorizeRoles,
} = require('../middleware/authMiddleware');

const router = Router();

router.get(
  '/',
  authenticateToken,
  categoryController.list
);

router.get(
  '/:id',
  authenticateToken,
  categoryController.getById
);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  categoryController.create
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  categoryController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  categoryController.delete
);

module.exports = router;
