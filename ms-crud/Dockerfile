
# Using light image from node.js
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the code
COPY . .

# Code build
RUN npm run build

# Port: 4002
EXPOSE 4002

# Default command
CMD ["node", "dist/index.js"]
