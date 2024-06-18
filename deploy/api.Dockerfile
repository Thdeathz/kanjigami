FROM node:18-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN npx prisma generate

RUN yarn build

CMD ["yarn", "prod"]
