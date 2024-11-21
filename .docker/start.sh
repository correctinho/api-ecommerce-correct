#!/bin/bash

npm install

npx prisma generate 

npm run start

tail -f /dev/null
