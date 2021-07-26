FROM node:16-alpine

WORKDIR /usr/apps/jds/express-dashboard-queue

COPY . .

COPY package*.json ./

RUN yarn install --silent && yarn cache clean --all

CMD ["yarn", "start"]