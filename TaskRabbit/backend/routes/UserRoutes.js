const express = require('express');
const app = express();
const {addUser} = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');
const {getProfile} = require('../controllers/userController')

const router = express.Router();

router.route('/register').post(addUser);
router.route('/login').post(loginUser);
router.route('/profile:email').get(getProfile); // get user from the email, TODO: Add JWT Authentication Route

module.exports = router;

