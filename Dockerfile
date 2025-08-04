FROM node:24-alpine AS base
RUN npm install -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY ./backend . 
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules

CMD ["node", "dist/index.js"]