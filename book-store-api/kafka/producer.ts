import { Kafka } from 'kafkajs';
import { registerSchema, registry } from './registry';

export const TOPIC = 'books-api';

const kafka = new Kafka({
    clientId: 'book-store-api',
    brokers: ['localhost:29092'],
});

const producer = kafka.producer();

const produce = async (message: string) => {
    try {
        const registryId = await registerSchema();
        if (registryId) {
            await producer.connect();
            const messageSent = {
                id: new Date().toDateString(),
                value: message
            }
            await producer.send({
                topic: TOPIC,
                messages: [
                    {
                        key: messageSent.id,
                        value: await registry.encode(registryId, messageSent)
                    }
                ]
            });

            await producer.disconnect();
        }
    } catch (error) {
        console.log(error);
    }
}

export default produce;