FROM node:18-alpine AS build

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

RUN npm run-script deploy_preprod

####
FROM nginx:1.17.1-alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /dist /usr/share/nginx/html
