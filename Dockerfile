FROM node:latest

WORKDIR /home/cs806/ilend/ilend-lease-service

COPY * ./

RUN npm install

RUN npm run build

WORKDIR /home/cs806/ilend/ilend-lease-service/dist

ENV NODE_ENV prod

EXPOSE 5003
CMD [ "node", "index.js" ]
