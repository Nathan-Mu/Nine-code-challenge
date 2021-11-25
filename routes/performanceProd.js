const express = require('express');
const fs = require('fs');
const path = require('path');
const { writeToString } = require('@fast-csv/format');

const router = express.Router();

const dir = '../performance-prod';
const dirPath = path.resolve(__dirname, dir);

if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath, { recursive: true });
}

// request body data format
// {uniqueId, rows: [{uniqueId, deviceId, systemVersion, eventName, timestamp}]}

router.post('', async (req, res) => {
  const { uniqueId, rows } = req.body;
  const filePath = path.resolve(__dirname, dir, `${uniqueId}.csv`);
  const isExisted = fs.existsSync(filePath)
  if (rows) {
    const data = await writeToString(rows, { headers: !isExisted});
    fs.appendFile(filePath, data + '\n', (error) => {
      if (error) {
        console.log(error);
        res.status(400).send();
      }
      console.log('append data success');
      res.status(200).send();
    })
  } else {
    res.status(400).send();
  }
});

module.exports = router;