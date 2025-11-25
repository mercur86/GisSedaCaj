# Etapa 1: construir el frontend
FROM node:10 AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# Si dot-prop está en package.json no es necesario; si no, añádelo al package.json
RUN npm install dot-prop --save
COPY . .
# Si tu script de build es: node src/setup mode=production && react-scripts build
# usa la misma línea para que se ejecute dentro del contenedor
RUN node src/setup mode=production && npm run build
#RUN node src/setup mode=development && npm run build

# Etapa 2: runtime con Node (servir con Express)
FROM node:10

WORKDIR /usr/src/app

# Copiamos package.json raíz y solo instalamos dependencias de producción
COPY package*.json ./
RUN npm install --only=production

# Copiamos el código del servidor
COPY server ./server

# Copiamos el build del frontend dentro de server/public para que Express lo sirva
# después de generar el build en la etapa build
# copia al directorio donde Express lo busca
COPY --from=build /usr/src/app/build ./server/public
# además copia al path /usr/src/app/build para compatibilidad
COPY --from=build /usr/src/app/build /usr/src/app/build


EXPOSE 7777

# Ejecutar el servidor Express
CMD ["node", "server/index.js"]
