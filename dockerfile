FROM node:21-alpine3.19

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Instalar pnpm globalmente usando npm
RUN npm install -g pnpm

# Copiar los archivos necesarios para instalar dependencias
COPY package*.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 3003
