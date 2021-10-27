FROM node:16-alpine

WORKDIR /usr/apps/jds/express-dashboard-queue

COPY . .

COPY package.json yarn.lock ./

RUN yarn install --production=true && yarn cache clean --all

CMD ["yarn", "start"]
