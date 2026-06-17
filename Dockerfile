FROM node:20-bullseye AS build

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

RUN npm run-script deploy_preprod

####
FROM nginx:stable

RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/app/dist /usr/share/nginx/html
