FROM node:20 AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY ob-kavici/package.json ob-kavici/pnpm-lock.yaml ./
RUN pnpm install
COPY ob-kavici .
ARG VITE_GAMES_SERVICE_URL
ENV VITE_GAMES_SERVICE_URL=${VITE_GAMES_SERVICE_URL}
RUN pnpm run build
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]