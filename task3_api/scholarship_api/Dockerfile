# Use Node LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "index.js"]
