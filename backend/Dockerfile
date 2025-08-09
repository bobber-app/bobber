FROM node:20-alpine

WORKDIR /app

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Copy dependency manifest for better layer caching
COPY package.json ./

# Install dependencies (include dev deps for watch mode)
RUN pnpm install

# Copy the rest of the source code
COPY . .

EXPOSE 8080

CMD ["sh", "-c", "pnpm install && pnpm run start:dev"]