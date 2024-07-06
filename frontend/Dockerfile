FROM node:20.15-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "preview"]