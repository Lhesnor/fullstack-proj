FROM node:19

WORKDIR /use/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
CMD ["serve", "-s", "build"]
