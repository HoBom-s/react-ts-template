## Node
FROM node:20

ENV NODE_ENV development

## Directory
WORKDIR /usr/src/app

RUN npm install -g yarn

COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY ./ ./

EXPOSE 3000

## Dev mode start
CMD ["yarn", "dev"]