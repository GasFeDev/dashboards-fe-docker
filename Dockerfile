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

# STEP 2 build a small nginx image with static website test
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/configfile.template

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets to nginx image
COPY --from=builder /app/build /usr/share/nginx/html
ENV PORT 3000
ENV HOST 0.0.0.0
EXPOSE 3000
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"