FROM node:19-slim

ENV HOME=/usr/bma/account
WORKDIR ${HOME}/src

COPY ./package.json .
RUN yarn && yarn cache clean

COPY . .

EXPOSE 8181

CMD ["yarn"] ["start"]
