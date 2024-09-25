FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/bromelia-imperial/browser /usr/share/nginx/html
COPY ./infra/nginx.conf /etc/nginx/nginx.conf
COPY ./infra/mime.types /etc/nginx/mime.types
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]