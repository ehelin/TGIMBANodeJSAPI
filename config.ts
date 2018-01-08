import * as AWS from 'aws-sdk';
import {DynamoDB} from 'aws-sdk';

export const databaseOptions = {
    accessKeyId: 'fakeAccessKeyId',
    secretAccessKey: 'fakeSecretAccessKey',
    region: 'fakeRegion',
    endpoint: 'http://localhost:8000',
};

export const setDynamoDbConnection = (): AWS.DynamoDB => {
    const docClient = new DynamoDB(databaseOptions);

    return docClient;
};
