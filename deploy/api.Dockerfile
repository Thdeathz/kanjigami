FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN yarn run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Set the correct permission for prerender cache
RUN mkdir dist
RUN chown expressjs:nodejs dist

COPY --from=builder --chown=expressjs:nodejs /app/dist ./
COPY --from=builder --chown=expressjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=expressjs:nodejs /app/tsconfig.json ./

USER expressjs

EXPOSE 3500

ENV PORT 3500

CMD HOSTNAME="0.0.0.0" node -r ts-node/register/transpile-only -r tsconfig-paths/register ./src/server.js
