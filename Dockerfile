## Node
FROM node:20

ENV NODE_ENV development

## Directory
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY ./ ./

EXPOSE 3000

## Dev mode start
CMD ["npm", "run", "dev"]