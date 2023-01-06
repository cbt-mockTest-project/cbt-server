FROM node:16.13.2-alpine3.15

RUN apk update
RUN apk upgrade
WORKDIR /CBT-SERVER
COPY . .
RUN yarn global add pm2 
ENV NODE_PATH .
ENV NODE_ENV production

COPY package*.json .
RUN yarn install --production

CMD ["pm2-runtime", "start", "ecosystem.config.js"]