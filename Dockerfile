FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

RUN yarn add -g @nestjs/cli@8.0.0

USER node

WORKDIR /home/node/app