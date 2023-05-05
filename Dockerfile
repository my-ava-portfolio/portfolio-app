FROM node:18-alpine AS build-env

COPY package-lock.json ./

RUN npm install
COPY . .
RUN npm run-script deploy

# Run Stage
FROM alpine:3.17.1

# Copy only required data into this image
COPY --from=build-env /dist ./dist

RUN addgroup -S appgroup && adduser -S ava -G appgroup
USER ava
