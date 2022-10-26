FROM node:19-slim

ENV HOME=/usr/bma/social
WORKDIR ${HOME}/src

COPY ./package.json .
RUN yarn && yarn cache clean

COPY . .

EXPOSE 8585

CMD ["yarn"] ["start"]
