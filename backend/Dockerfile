FROM node:22-alpine

WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY backend/package.json ./

# Copy backend code
COPY backend/ ./

# Copy shared folder
COPY shared ./shared

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:backend"]
