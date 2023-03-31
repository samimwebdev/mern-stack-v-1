const express = require('express')
const router = express.Router()
const User = require('../models/User')
const authController = require('../controllers/authController')
const requiredAuth = require('../middlewares/requiredAuth')

router.post('/register', authController.registerController)
router.post('/login', authController.loginController)
router.get('/dashboard', requiredAuth, authController.dashboardController)

module.exports = router
