
const { Router } = require('express');
const productController = require('../controllers/productController');
const {
  authenticateToken,
  authorizeRoles,
} = require('../middleware/authMiddleware');
const { handleValidation } = require('../middleware/validationMiddleware');
const {
  listProductsValidator,
  createProductValidator,
  updateProductValidator
} = require('../validators/productValidators');

const router = Router();

router.get(
  '/',
  authenticateToken,
  listProductsValidator,
  handleValidation,
  productController.list
);

router.get(
  '/:id',
  authenticateToken,
  productController.getById
);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  createProductValidator,
  handleValidation,
  productController.create
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  updateProductValidator,
  handleValidation,
  productController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'manager'),
  productController.delete
);

module.exports = router;
