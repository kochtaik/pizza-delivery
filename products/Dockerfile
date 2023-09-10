FROM node:16-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY src/index.ts ./

# Exports
EXPOSE 3000
CMD [ "npm", "run", "start" ]