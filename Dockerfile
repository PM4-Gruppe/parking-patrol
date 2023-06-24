#--- Select target os ---
FROM node:18-alpine

#--- Setup Work directory ---
WORKDIR /app

#--- Copy dependencies ---
COPY package.json package-lock.json ./

#--- Install dependencies
RUN npm install
COPY . .

#--- For Production ---
#COPY .next ./.next
#COPY public ./public
#COPY prisma ./prisma
COPY .env .

#--- For Development ---
#COPY next.config.js ./next.condig.js
#COPY pages ./pages
#COPY public ./public
#COPY styles ./styles

#--- Commands ---
CMD ["npm", "run", "dev:generate:migrate"]
