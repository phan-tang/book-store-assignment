import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
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

// Apply Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Book Store Management System API',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:8000/api',
            description: 'Development server',
        },
    ]
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
