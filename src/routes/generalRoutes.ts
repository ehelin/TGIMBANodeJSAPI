import express = require('express');

let router = express.Router();

router.get('/', function (req, res) {
    res.send('Welcome to the TGIMBA Nodejs API');
});

router.get('/apiCheck', function (req, res) {
    res.send('API Check end point');
});

export = router;
