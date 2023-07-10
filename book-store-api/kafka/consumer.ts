import { Kafka } from 'kafkajs';
import { registry } from './registry';
import { TOPIC } from './producer';

const kafka = new Kafka({
    clientId: 'book-store-api',
    brokers: ['localhost:29092'],
});

const consumer = kafka.consumer({ groupId: 'book-store-api-group' });

consumer.connect();
consumer.subscribe({ topic: TOPIC, fromBeginning: true });

consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        message.value && console.log({
            value: await registry.decode(message.value),
        });
    },
});