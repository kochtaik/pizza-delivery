FROM node:16-alpine

# Create app directory
RUN mkdir -p /usr/src/products-service
WORKDIR /usr/src/products-service

# Install dependencies
COPY ./package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Exports
EXPOSE 3001
CMD [ "npm", "run", "start" ]