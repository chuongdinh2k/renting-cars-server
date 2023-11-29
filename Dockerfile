# Use an official Node.js runtime as the base image
FROM node:16

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install application dependencies
RUN npm install -f

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on (replace with your app's port)
EXPOSE 8001

# Define the command to start your NestJS application
CMD [ "npm","run","start:dev" ]
