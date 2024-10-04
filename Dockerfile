FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3000

CMD ["npm", "run", "dev"]