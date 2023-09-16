FROM node:16-alpine

# Create app directory
RUN mkdir -p /usr/src/auth-service
WORKDIR /usr/src/auth-service

# Install dependencies
COPY ./package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Exports
EXPOSE 3002
CMD [ "npm", "run", "start" ]