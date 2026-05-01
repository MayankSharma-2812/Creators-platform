# Use node:18-alpine as the base image
FROM node:18-alpine

# Set WORKDIR to /app
WORKDIR /app

# Copy package.json and package-lock.json first for layer caching
COPY package.json package-lock.json ./

# Run npm ci to install dependencies (clean install for production)
RUN npm ci

# Copy the remaining application source code
COPY . .

# Expose port 5000
EXPOSE 5000

# Set CMD to start the server
CMD ["node", "server.js"]
