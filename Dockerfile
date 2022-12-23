FROM node:19-alpine as node

WORKDIR /home/node/app

COPY . .

RUN yarn install
