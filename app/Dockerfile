FROM node:20-alpine

WORKDIR /app

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

# Copy dependency manifests first for better layer caching
COPY package.json ./

# Install dependencies (include dev deps for watch mode)
RUN pnpm install

# Copy source (we install at runtime to work with bind mounts and anonymous node_modules volume)
COPY . .

EXPOSE 5173

# Ensure file watching works reliably in containers
ENV CHOKIDAR_USEPOLLING=true

# Install deps at container start (for mounted workspace) and run Vite dev server
CMD ["sh", "-c", "pnpm run dev"]
