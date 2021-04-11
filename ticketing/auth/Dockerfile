FROM node:alpine

WORKDIR /app
COPY package.json .
# ignore the --save-dev packages
RUN yarn install --production
COPY . .

CMD ["yarn", "start"]