FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4201

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4201"]