FROM node:lts-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /opt/sprout
WORKDIR /opt/sprout

# Installing dependencies
COPY package*.json /opt/sprout/
RUN npm ci

# Copying source files
COPY . /opt/sprout

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "start"