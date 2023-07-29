# Book Store Assignment

This application is a book store management system using Angular and Expressjs.

### Steps to run application

Copy .env.example and change its name to .env

Use grantRoleToUser.mongodb.js to create and grant role to database's admin.

Run application by command
- docker-compose up -d

Seed data:
- cd book-store-api
- Copy .env.example and change its name to .env
- npm run seed

### MinIO

MinIO is used for storing book's images and Kafka messages.

We use browser to navigate to localhost port 9000 to use MinIO.

Create 2 buckets:
- book-store: Used to store book'images.
- kafka-messages: Used to store Kafka messages for create, update, delete books actions.

For MinIO connection, we need to create credentials, download credentials.json file and store it in book-store-api folder.

### Report

TransformData.ipynb to used for generating reports base on Kafka messages stored in book-store bucket.

To run TransformData.ipynb:
- Use browser to navigate localhost port 8888, open TransformData.ipynb and run all, report will be generated based on yesterday Kafka messages stored in MinIO.
