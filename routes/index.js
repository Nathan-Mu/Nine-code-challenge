const express = require('express');
const filter = require('./filter');
const log = require('./log');
const performance = require('./performance');

const router = express.Router();

router.use('/performance', performance);
router.use('/log', log);
router.use('/api/filter', filter);


module.exports = router;