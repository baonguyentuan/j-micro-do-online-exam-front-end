FROM node:18.3.0-alpine3.14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 for the React application
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]