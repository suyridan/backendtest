FROM node:16.20.2 AS NODE_BUILD

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.20.2
WORKDIR /usr
COPY --from=NODE_BUILD /app/package.json .
COPY --from=NODE_BUILD /app/dist /usr/dist
RUN npm install --only=production
EXPOSE 8000

CMD ["npm", "start"]