# Stage 1: Build the Angular application
FROM node:18.15.0 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration production  

# Stage 2: Serve the application with NGINX
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/applictioncommerciale /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
