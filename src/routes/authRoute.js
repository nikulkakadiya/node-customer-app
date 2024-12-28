const express = require('express');
const { registerCustomer, verifyEmail, registerAdmin, login } = require('../controllers/authController');
const { registrationMiddleware, loginMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/customer-register',registrationMiddleware,registerCustomer);
router.post('/admin-register',registrationMiddleware,registerAdmin);
router.post('/login',loginMiddleware,login);
router.get('/verify-email', verifyEmail);

module.exports = router;