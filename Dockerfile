FROM node:16.15.1-alpine

WORKDIR /usr/src/app/

COPY . .

RUN yarn install
RUN yarn build
CMD [ "node", "dist/main.js" ]