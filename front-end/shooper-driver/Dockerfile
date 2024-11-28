FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./ 

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]
