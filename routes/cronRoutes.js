const express = require('express');
const cronController = require('../controllers/cronController');

const router = express.Router();

router
  .route('/')
  .get(cronController.getAllCrons)
  .post(cronController.createCron);
router.route('/start').post(cronController.startCronbyName);
router.route('/stop').post(cronController.stopCronbyName);
router.route('/startall').post(cronController.startAllCrons);
router.route('/stopall').post(cronController.stopAllCrons);

module.exports = router;
