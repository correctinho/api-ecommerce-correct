FROM node:20.5.1-slim

RUN  npm install -g @nestjs/cli

WORKDIR /home/node/app

# Instale o OpenSSL
RUN apt-get update && apt-get install -y openssl

COPY package*.json .
COPY . .


CMD ["tail", "-f", "/dev/null"]
