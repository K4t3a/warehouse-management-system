
const { Router } = require('express');
const orderController = require('../controllers/orderController');
const {
  authenticateToken,
  authorizeRoles
} = require('../middleware/authMiddleware');
const { handleValidation } = require('../middleware/validationMiddleware');
const {
  listOrdersValidator,
  createOrderValidator,
  changeStatusValidator
} = require('../validators/orderValidators');

const router = Router();


router.get(
  '/',
  authenticateToken,
  listOrdersValidator,
  handleValidation,
  orderController.list
);

router.get(
  '/:id',
  authenticateToken,
  orderController.getById
);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'manager', 'storekeeper'),
  createOrderValidator,
  handleValidation,
  orderController.create
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  orderController.update
);

router.patch(
  '/:id/status',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  changeStatusValidator,
  handleValidation,
  orderController.changeStatus
);

module.exports = router;
