FROM node:19-slim

ENV HOME=/usr/bma/account
WORKDIR ${HOME}/src

COPY ./package.json .
COPY ./src/database/prisma ./prisma/
COPY . .

RUN yarn && yarn cache clean
RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 8181

CMD ["yarn"] ["start"]
