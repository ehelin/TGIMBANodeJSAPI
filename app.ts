import express = require('express');
import bodyParser = require('body-parser');
import generalRoutes = require('./src/routes/generalRoutes');
import dynamoDbRoutes = require('./src/routes/dynamoDbRoutes');
import sqlServerRoutes = require('./src/routes/sqlServerRoutes');

let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(generalRoutes);
app.use(dynamoDbRoutes);
app.use(sqlServerRoutes);

app.listen(port, function () {
    console.log('app started and listenting on ' + port);
});

// TODO - put in integration tests


// TODO - add logger

// TODO - add types for any any's (where possible)
