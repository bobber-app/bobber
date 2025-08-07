FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --force --ignore-scripts
RUN npm install ajv@8.13.0 --no-save
RUN npm install ajv-draft-04@1.0.0 --no-save

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]