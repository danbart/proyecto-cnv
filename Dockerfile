# Usa la imagen oficial de Node
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la app
COPY . .

# Expone el puerto que usa NestJS
EXPOSE 3000

# Comando por defecto para iniciar en modo desarrollo
CMD ["npm", "run", "start:dev"]
