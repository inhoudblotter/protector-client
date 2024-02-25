FROM node:20.11.0-alpine3.18

WORKDIR /usr/app/
COPY ./ /usr/app/

RUN npm i && npm run build && npm prune --production
ENV NODE_ENV=production

CMD [ "npm", "start" ]
