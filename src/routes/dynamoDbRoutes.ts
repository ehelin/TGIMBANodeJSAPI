import express = require('express');
import * as Create from '../dynamodb/createBucketListItem';
import * as Read from '../dynamodb/readBucketListItem';
import * as Delete from '../dynamodb/deleteBucketListItem';

let router = express.Router();

router.put('/ddCreate', function (req, res) {
    const result = Create.createBucketListItem(req.body);

    res.send(result);
});

router.get('/ddRead', function (req, res) {
    const result = Read.readBucketListItem(req.query);

    res.send(result);
});

router.delete('/ddDelete', function (req, res) {
    const result = Delete.deleteBucketListItem(req.body);

    res.send(result);
});

export = router;