FROM node:20-alpine
WORKDIR /app
COPY package.json index.js ./
# Zero-dependency : pas de npm install nécessaire
ENV NODE_ENV=production
EXPOSE 3000
# Glama évalue via stdio ; le conteneur doit démarrer et répondre à l'introspection
CMD ["node", "index.js"]