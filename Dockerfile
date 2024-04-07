FROM node:18-slim

RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && apt-get install -y libxss1 \
    && apt-get install -y libnss3 \
    && apt-get install -y fonts-liberation \
    && apt-get install -y libappindicator3-1 \
    && apt-get install -y libasound2 \
    && apt-get install -y libatk-bridge2.0-0 \
    && apt-get install -y libatspi2.0-0 \
    && apt-get install -y libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 9000
CMD ["npm", "start"]
