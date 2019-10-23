FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV BACKEND_PORT=3900
RUN chmod +x ./launch.sh
EXPOSE 3900 3000

CMD ./launch.sh