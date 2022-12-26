FROM node:19-slim

ENV HOME=/usr/bma/api
WORKDIR ${HOME}/src

COPY ./package.json .
RUN yarn && yarn cache clean

COPY . .

CMD ["yarn"] ["start"]
