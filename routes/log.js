const express = require('express');

const router = express.Router();

router.post('', (req, res) => {
  // console.log(req.body);
  console.log(JSON.stringify(req.body, null, 2))
  res.status(200).send();
});

module.exports = router;