
const { Router } = require('express');
const authController = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { loginValidator, registerValidator } = require('../validators/authValidators');
const { handleValidation } = require('../middleware/validationMiddleware');

const router = Router();

router.post("/login", loginValidator, handleValidation, authController.login);

router.get('/me', authenticateToken, authController.getMe);
router.put('/profile', authenticateToken, authController.updateProfile);
router.put('/password', authenticateToken, authController.changePassword);

router.post(
  "/register",
  authenticateToken,
  authorizeRoles('admin'),
  registerValidator,
  handleValidation,
  authController.register
);

router.get('/', (req, res) => {
  res.json({
    message: 'Auth API is working',
    endpoints: {
      'POST /login': 'User login',
      'GET /me': 'Get current user (requires auth)',
      'PUT /profile': 'Update profile (requires auth)',
      'PUT /password': 'Change password (requires auth)',
      'POST /register': 'Register new user (requires admin role)'
    }
  });
});

module.exports = router;
