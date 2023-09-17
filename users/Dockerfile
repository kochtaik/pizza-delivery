FROM node:16-alpine

RUN mkdir -p /usr/src/users-service
WORKDIR /usr/src/users-service

COPY ./package*.json .
RUN npm install

COPY . .

EXPOSE 3003
CMD [ "npm", "run", "start" ]
