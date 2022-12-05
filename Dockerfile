FROM node:18
WORKDIR /home/glesio/.storage/clean-node-api
COPY ./package.json .
RUN npm install --omit=dev
