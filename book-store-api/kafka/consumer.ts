import { Kafka } from 'kafkajs';

import s3 from '../minIO/s3';
import { ManagedUpload } from 'aws-sdk/clients/s3';

const bucket = 'kafka-messages';

const kafka = new Kafka({
    clientId: 'book-store-api',
    brokers: ['localhost:29092'],
});

const consumer = kafka.consumer({ groupId: 'book-store-api-group' });

const uploadMessage = (message: any) => {
    const params = {
        Bucket: bucket,
        Key: `${Date.now().toString()}.avro`,
        Body: Buffer.from(message.value)
    }

    s3.upload(params, function (error: Error, data: ManagedUpload.SendData) {
        if (error) {
            throw error;
        }
        console.log('Upload successfully')
    })
}

export { consumer, uploadMessage };