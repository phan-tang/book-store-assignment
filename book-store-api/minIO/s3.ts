import AWS from 'aws-sdk';
import * as fs from 'fs';

const { accessKey, secretKey } = JSON.parse(fs.readFileSync('./credentials.json', 'utf-8'));

const s3 = new AWS.S3({
    endpoint: 'http://127.0.0.1:9000',
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    sslEnabled: false,
    s3ForcePathStyle: true
});

export default s3;