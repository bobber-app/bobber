# Stage 1: Install dependencies
FROM node:20-alpine AS dependencies
RUN npm install -g pnpm @quasar/cli
WORKDIR /app
COPY package.json ./
RUN pnpm install

# Stage 2: Build and serve the application
FROM dependencies AS production
WORKDIR /app
COPY . .
RUN pnpm build
EXPOSE 4000
CMD ["quasar", "serve", "dist/spa", "--port", "4000", "--hostname", "0.0.0.0"]
