# STAGE 1: BUILD
FROM node:18-alpine as node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#STAGE 2: RUN
FROM nginx:latest as ngi

COPY --from=node /app/dist/book-store-ui /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 4200