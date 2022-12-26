FROM node:19-slim

ENV HOME=/usr/bma/payment
WORKDIR ${HOME}/src

COPY ./package.json .
RUN yarn && yarn cache clean

COPY . .

EXPOSE 8383

CMD ["yarn"] ["start"]
