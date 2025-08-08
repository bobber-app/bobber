FROM node:20-alpine

WORKDIR /app

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Copy source (we install at runtime to work with bind mounts and anonymous node_modules volume)
COPY . .

EXPOSE 5173

# Ensure file watching works reliably in containers
ENV CHOKIDAR_USEPOLLING=true

# Install deps at container start (for mounted workspace) and run Vite dev server
CMD ["sh", "-c", "pnpm install --no-frozen-lockfile && pnpm run dev -- --host 0.0.0.0 --port 5173"]
