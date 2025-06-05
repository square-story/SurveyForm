FROM node:22-alpine

WORKDIR /app

COPY backend/package.json ./
COPY backend/ ./
COPY shared ./shared

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]