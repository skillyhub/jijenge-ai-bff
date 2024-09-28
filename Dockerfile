 # Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 7000
EXPOSE 9000

# Define environment variables (optional)
ENV NODE_ENV=production

# Command to run your Node.js app
CMD ["node", "index.js"]
