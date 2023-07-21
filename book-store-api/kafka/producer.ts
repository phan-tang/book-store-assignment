import { Kafka } from 'kafkajs';
import { registerSchema, registry } from './registry';

export const TOPIC = 'books-api';

const kafka = new Kafka({
    clientId: 'book-store-api',
    brokers: ['localhost:29092'],
});

const producer = kafka.producer();

const produce = async (message: any, action: string) => {
    try {
        const registryId = await registerSchema();
        if (registryId) {
            await producer.connect();
            const messageSent = {
                date: new Date().toDateString(),
                action: action,
                author: message.author_name,
                category: message.category_name,
                id: message.id,
                name: message.name,
                price: message.price.toString(),
                final_price: message.price.toString(),
                quantity: message.quantity.toString()
            }
            await producer.send({
                topic: TOPIC,
                messages: [
                    {
                        key: Date.now().toString(),
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