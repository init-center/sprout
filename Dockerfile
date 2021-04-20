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

# Set the timezone to Shanghai
# dont del tzdata, because del tzdata will invalidate the modification
ENV TZ=Asia/Shanghai

RUN apk add tzdata && cp /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone

# Running the app
CMD "npm" "start"