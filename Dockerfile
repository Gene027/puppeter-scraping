FROM ubuntu:latest

WORKDIR /usr/src/app

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install sudo -y && \
    sudo apt install -y git && \
    sudo apt install curl ca-certificates gnupg -y 

RUN mkdir -p /etc/apt/keyrings

ENV NODE_MAJOR=18
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

RUN sudo apt-get update -y 
RUN sudo apt-get install -y nodejs
RUN sudo node -v
RUN sudo apt-get install -y libfontconfig fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 \
    libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 \
    libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    lsb-release wget xdg-utils libatspi2.0-0 libdrm2 libuuid1 libxcb-dri3-0 libxkbcommon0 libxshmfence1 \
    bzip2 libcairo2 fontconfig libc6 make

RUN sudo corepack enable
COPY package*.json  /usr/src/app/

COPY . /usr/src/app/

RUN npm install
RUN npm run build

EXPOSE 9000
CMD ["npm", "start"]
