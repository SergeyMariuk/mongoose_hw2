const express = require('express');
const controller = require('./controllers');
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/main', controller.getMainPageController)
router.get('/wellcome', auth, controller.getWelcomePageController)
router.post('/register', controller.registerPageController)
router.post('/login', controller.loginPageController)

module.exports = router;
