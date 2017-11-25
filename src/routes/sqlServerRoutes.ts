import express = require('express');
import {getBucketListItems} from "../sqlserver/getBucketListItems";
import {getUserCount} from "../sqlserver/getUserCount";
import {processUser} from "../sqlserver/processUser";
import {processUserRegistration} from "../sqlserver/processUserRegistration";
import {upsertBucketListItem} from "../sqlserver/upsertBucketListItem";
import {deleteBucketListItem} from "../sqlserver/deleteBucketListItem";

let router = express.Router();

router.get('/getUserCount', function (req, res) {
    const result = getUserCount();

    res.send(result);
});

router.get('/getBucketListItems', function (req, res) {
    const result = getBucketListItems(req.query);

    res.send(result);
});

router.post('/processUser', function (req, res) {
    const result = processUser(req.body);

    res.send(result);
});

router.post('/processUserRegistration', function (req, res) {
    const result = processUserRegistration(req.body);

    res.send(result);
});

router.post('/upsertBucketListItem', function (req, res) {
    const result = upsertBucketListItem(req.body);

    res.send(result);
});

router.post('/deleteBucketListItem', function (req, res) {
    const result = deleteBucketListItem(req.body);

    res.send(result);
});

export = router;
