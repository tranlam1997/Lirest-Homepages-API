# syntax=docker/dockerfile:1
FROM node:16-alpine as ts-compiler
RUN npm install -g pnpm
WORKDIR /app
COPY ["pnpm-lock.yaml", "./"]
COPY ["tsconfig.json", "./"]
RUN pnpm fetch
COPY . .
RUN pnpm install -r --offline --ignore-scripts
RUN pnpm build

FROM node:16-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY ["package.json", "pnpm-lock.yaml", "./"]
COPY ["config", "./config"]
COPY ["/src/common/swagger/swagger-ui-custom.css", "./common/swagger/"]
COPY --from=ts-compiler ["/app/dist", "./"]
RUN pnpm install --frozen-lockfile -P --ignore-scripts
EXPOSE 3000
CMD ["node", "main.js"]
