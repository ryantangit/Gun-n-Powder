# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Build the Remix app (if necessary, e.g., for production mode)
RUN npm run build

# Expose the port Remix is running on 
EXPOSE 3000

# Command to start the Remix app
CMD ["npm", "run", "start"]

