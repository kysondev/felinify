FROM node:20-slim as builder
WORKDIR /app

COPY ../package.json ../package-lock.json ./
RUN npm ci
COPY ../ .

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_BETA_MODE
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_BETA_MODE=$NEXT_PUBLIC_BETA_MODE

RUN npm run build

FROM node:20-slim as runner
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/types ./.next/types
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/server ./.next/server

EXPOSE 3000

ENTRYPOINT ["node", "server.js", "-H", "0.0.0.0"]