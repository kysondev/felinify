FROM node:20-slim as builder
WORKDIR /app

COPY ../package.json ../package-lock.json ./
RUN npm ci
COPY ../ .
RUN --mount=type=secret,id=RESEND_API_KEY,env=RESEND_API_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME \
    --mount=type=secret,id=NEXT_PUBLIC_CLOUDINARY_API_KEY,env=NEXT_PUBLIC_CLOUDINARY_API_KEY \
    --mount=type=secret,id=CLOUDINARY_SECRET,env=CLOUDINARY_SECRET \
    npm run build

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