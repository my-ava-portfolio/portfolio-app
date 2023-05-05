FROM node:18-alpine AS build-env

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

RUN npm run-script deploy
