# Use Node.js official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# # Build the app (production only)
# RUN npm run build

# Expose port 3002 (as defined in package.json)
EXPOSE 3002

# Set environment variables for React dev server
ENV HOST=0.0.0.0
ENV PORT=3002

# Start the application
CMD ["npm", "start"]