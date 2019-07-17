const express = require('express');
const router = express.Router();

const controller = require('../controller/process');

router.get('/', controller.serveGET );
router.post('/', controller.servePOST );
router.put('/', controller.servePUT );
router.delete('/', controller.serveDELETE );

module.exports = router;
