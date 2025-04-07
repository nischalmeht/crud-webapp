const { signup, login } = require('../controller/auth.controller');

const express = require('express');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// router.post("./todo",)
module.exports = router;