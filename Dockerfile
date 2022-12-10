FROM node:19-alpine as node

WORKDIR /home/node/app

COPY . .

RUN npm install -g npm@9.2.0

RUN npm install
