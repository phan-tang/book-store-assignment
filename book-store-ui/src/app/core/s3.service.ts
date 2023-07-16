import { Injectable, OnInit } from '@angular/core';

import S3 from 'aws-sdk/clients/s3';
import credentials from 'credentials.json';

@Injectable()
export class S3Service implements OnInit {
    bucket: S3 = new S3({
        endpoint: 'http://127.0.0.1:9000',
        accessKeyId: credentials.accessKey,
        secretAccessKey: credentials.secretKey,
        sslEnabled: false,
        s3ForcePathStyle: true
    });

    constructor() { }

    ngOnInit(): void { }
}