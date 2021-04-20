FROM node:lts-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /opt/sprout
WORKDIR /opt/sprout

# Installing dependencies
COPY package*.json /opt/sprout/
RUN npm install

# Copying source files
COPY . /opt/sprout

ENV NODE_ENV production

# Building app
RUN npm run build
EXPOSE 3000

RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone

# Running the app
CMD "npm" "start"