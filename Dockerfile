FROM node:18

WORKDIR /app

#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs

COPY package*.json ./

RUN npm install

COPY . .

#COPY --chown=nextjs:nodejs . .

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

USER node
#USER nextjs

EXPOSE 3000

ENV PORT 3000

#CMD ["sh", "-c", "npm run dev & (while ! nc -z edu_tech 3000; do sleep 1; done) && curl http://edu_tech:3000"]
#CMD ["sh", "-c", "npm run dev"]
#CMD ["npm run:dev"]
