# Step 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Step 2: Production with yarn preview
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app /app

# Ensure vite is available
RUN yarn global add vite

EXPOSE 4173

CMD ["yarn", "preview", "--host"]
