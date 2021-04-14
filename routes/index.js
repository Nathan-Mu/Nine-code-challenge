const express = require('express');
const filter = require('./filter');

const router = express.Router();

router.use('/api/filter', filter);

module.exports = router;