# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install

# Install the OpenAI dependencies
RUN npm install openai readline-sync dotenv

# Define the entry point for the container
CMD ["npm", "start"]
