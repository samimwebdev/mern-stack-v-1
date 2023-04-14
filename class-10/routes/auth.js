const express = require('express')
const router = express.Router()
const User = require('../models/User')
const authController = require('../controllers/authController')
const requiredAuth = require('../middlewares/requiredAuth')
const uploadMiddleware = require('../middlewares/fileupload')

router.post('/register', authController.registerController)
router.post('/login', authController.loginController)
router.get('/dashboard', requiredAuth, authController.dashboardController)
router.post(
  '/profile',
  requiredAuth,
  uploadMiddleware,
  authController.updateProfile
)

router.get('/load-img/:imgName', requiredAuth, authController.serveImage)

module.exports = router
