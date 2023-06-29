import mongoose from 'mongoose';

export default class Database {
    constructor() { }

    async connectToDatabase(): Promise<void> {
        try {
            await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=${process.env.DB_NAME}`);

            console.info('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
        }
    }

    async disconnectFromDatabase(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log('Disconnected from the database');
        } catch (error) {
            console.error('Error disconnecting from the database:', error);
        }
    }
}

export { mongoose };