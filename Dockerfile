FROM node:latest

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY . .

RUN tsc

EXPOSE 8081

CMD ["npm", "start"]