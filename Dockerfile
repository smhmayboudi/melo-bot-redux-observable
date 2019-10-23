FROM node:8.16.2-jessie-slim AS build
RUN npm install typescript -g
COPY . /build
ARG NODE_ENV
RUN cd /build &&\
  npm run build || exit 0

FROM node:8.16.2-jessie-slim AS nodebuild
COPY --from=build /build/package.json /melo-bot-redux-observable/
WORKDIR /melo-bot-redux-observable
ARG NODE_ENV
RUN npm install --production

FROM node:8.16.2-jessie-slim
COPY --from=build /build/package.json /melo-bot-redux-observable/
WORKDIR /melo-bot-redux-observable
ARG NODE_ENV
COPY --from=build /build/dist /melo-bot-redux-observable
COPY --from=nodebuild /melo-bot-redux-observable/node_modules /melo-bot-redux-observable/node_modules

CMD ["node", "--require", "source-map-support/register", "index.js"]
