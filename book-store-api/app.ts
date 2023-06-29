import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import swaggerUi from "swagger-ui-express";
import routers from './routes';
import Database from './config/database';

const app = express();
dotenv.config();

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Remove x-powered-by header
app.disable('x-powered-by');

// Use routers
app.use('/', routers);

// Start the server
const port = process.env.PORT;
const database = new Database();

app.listen(port, async () => {
    console.info(`Server is successfully running on port ${port}`);
    // Connect to the database
    await database.connectToDatabase();
});

// Gracefully disconnect from the database when the application is terminated
process.on('SIGINT', async () => {
    await database.disconnectFromDatabase();
    process.exit(0);
});

export default app;
