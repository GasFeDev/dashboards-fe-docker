# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18-alpine3.15 AS builder
# Set the working directory to /app inside the container
WORKDIR /app

# Cache npm install
COPY package*.json ./
RUN npm install
COPY . .

# Build static assets
RUN npm run build

# Install Nginx
RUN apk add --update --no-cache nginx

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/frontend.conf

# Copy static assets to Nginx HTML folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
