FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

COPY .env.example .env

EXPOSE 8000

CMD ["npm", "run", "dev"]
