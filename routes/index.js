const express = require('express');
const filter = require('./filter');
const log = require('./log')

const router = express.Router();

router.use('/log', log)
router.use('/api/filter', filter);


module.exports = router;