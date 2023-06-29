import express from 'express';
import dotenv from 'dotenv';

import Database from '../../config/database';
import DatabaseSeeder from './databaseSeeder';

const seeder = express();
dotenv.config();

// Start the server
const port = process.env.PORT;
const database = new Database();
const databaseSeeder = new DatabaseSeeder();

seeder.listen(port, async () => {
    console.info(`Server is successfully running on port ${port}`);
    // Connect to the database
    await database.connectToDatabase();
    databaseSeeder.seed();
});

// Gracefully disconnect from the database when the application is terminated
process.on('SIGINT', async () => {
    await database.disconnectFromDatabase();
    process.exit(0);
});

export default seeder;