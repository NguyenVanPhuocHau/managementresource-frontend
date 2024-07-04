# Use an official Node runtime as a base image
FROM node:20.10.0-alpine

# Set the working directory in the container
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs in
EXPOSE 4200

# Command to run the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0"]
