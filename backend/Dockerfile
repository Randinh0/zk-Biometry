# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el resto del código
COPY . .

# Expone el puerto en que corre el backend
EXPOSE 3001

# Comando para correr el backend
CMD ["node", "server.js"]
