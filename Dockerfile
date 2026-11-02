# Use the patched Node LTS release in both stages. Keep Debian bookworm to
# avoid combining the runtime migration with an OS distribution upgrade.
FROM node:22.23.4-bookworm-slim@sha256:4b150b48b4116e2a22f2c39cc27025fbf4f153e2078fd3b14d159fdb5c7279da AS base
COPY scripts/check-system-ca.mjs /tmp/check-system-ca.mjs
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && update-ca-certificates \
    && node /tmp/check-system-ca.mjs \
    && rm /tmp/check-system-ca.mjs \
    && rm -rf /var/lib/apt/lists/*

# Build stage: install all dependencies and compile the Vite app
FROM base AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# Runtime stage: install only production dependencies and copy build output
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY --from=builder /app/build ./build
COPY server.js ./server.js

EXPOSE 8080

CMD ["node", "server.js"]
