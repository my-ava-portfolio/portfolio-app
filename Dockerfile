FROM node:lts-alpine3.24 AS build

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

RUN npm run-script deploy_preprod

####
FROM nginx:stable

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/app/dist /usr/share/nginx/html
