FROM node:16-alpine

LABEL maintainer="Firman Abdul Hakim <karir.firman@gmail.com>"

WORKDIR /usr/apps/jds/express-dashboard-queue

COPY . .

COPY package*.json ./

RUN yarn install --production=true && yarn cache clean --all

CMD ["yarn", "start"]