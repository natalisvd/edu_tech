FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3000

CMD ["sh", "-c", "npm run dev & (while ! nc -z localhost 3000; do sleep 1; done) && curl http://localhost:3000"]