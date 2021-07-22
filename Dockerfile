FROM node:16-alpine AS appbuild

LABEL Maintainer="Firman Abdul Hakim <fimzhakim@gmail.com>" \
      Description="Nodejs Expressjs"

WORKDIR /usr/apps/jds/express-dashboard-queue

COPY package.json ./

# COPY .babelrc ./
RUN yarn install

#copy source
COPY . .


# Build Stage 2
# This build takes the production build from staging build
#
FROM node:16-alpine

WORKDIR /usr/apps/jds/express-dashboard-queue

COPY package.json ./

# COPY .babelrc ./
RUN yarn install

COPY --from=appbuild /usr/apps/jds/express-dashboard-queue/ ./

RUN ["yarn", "dev"]