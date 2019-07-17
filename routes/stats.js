const express = require('express');
const router = express.Router();

const controller = require('../controller/stats');

router.get('/', controller.getStats );

module.exports = router;
