FROM node:18
WORKDIR /home/glesio/.storage/clean-node-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 3000
CMD npm start
