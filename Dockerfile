# Build stage: install all dependencies and compile the Vite app
FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage: install only production dependencies and copy build output
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/build ./build
COPY server.js ./server.js

EXPOSE 8080

CMD ["node", "server.js"]
