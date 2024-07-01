# # Stage 1: Build the Angular application
FROM node:14 as build

# # Set working directory
WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# # Install dependencies
RUN npm install

# # Copy the rest of the application to the working directory
COPY . .

# # Build the Angular application
# RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built application from the previous stage
COPY ./dist/itca-connect-front/browser /usr/share/nginx/html

# Copy the Nginx configuration file
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]