FROM node:16-alpine

ENV NODE_ENV=development

WORKDIR /app

COPY . .

RUN npm install

COPY .env.example .env

EXPOSE 8000

CMD ["npm", "run", "dev"]
