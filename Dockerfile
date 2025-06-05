# Dockerfile

FROM node:18

WORKDIR /app

# Copiar archivos de proyecto
COPY package*.json ./
COPY hardhat.config.js ./
COPY contracts ./contracts
COPY scripts ./scripts

# Instalar dependencias
RUN npm install

# Exponer puerto Hardhat (default 8545)
EXPOSE 8545

# Comando para arrancar la red y hacer deploy
CMD npx hardhat node --hostname 0.0.0.0 & \
    sleep 5 && \
    npx hardhat run scripts/deploy.js --network localhost && \
    tail -f /dev/null
