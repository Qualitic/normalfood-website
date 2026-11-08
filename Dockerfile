FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG PUBLIC_SITE_URL
ARG PUBLIC_FOODFLOW_ORDER_URL
ENV PUBLIC_SITE_URL=${PUBLIC_SITE_URL}
ENV PUBLIC_FOODFLOW_ORDER_URL=${PUBLIC_FOODFLOW_ORDER_URL}
RUN npm run check && npm run build

FROM nginx:stable-alpine
ARG SOURCE_REVISION
LABEL org.opencontainers.image.revision=${SOURCE_REVISION}
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 80
