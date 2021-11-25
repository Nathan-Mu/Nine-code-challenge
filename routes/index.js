const express = require('express');
const filter = require('./filter');
const log = require('./log');
const performance = require('./performance');
const performanceProd = require('./performanceProd');

const router = express.Router();

router.use('/performance', performance);
router.use('/performance-prod', performanceProd);
router.use('/log', log);
router.use('/api/filter', filter);


module.exports = router;