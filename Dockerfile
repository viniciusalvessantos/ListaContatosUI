# Usa uma imagem oficial do Node.js como base
FROM node:14-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho no contêiner
COPY . .

# Compila a aplicação React para produção
RUN npm run build

# Usa um servidor web leve para servir os arquivos estáticos (ex. nginx ou serve)
RUN npm install -g serve

# Exponha a porta que o contêiner vai escutar (a padrão para o serve é 5000)
EXPOSE 5000

# Comando para iniciar o servidor e servir o build da aplicação React
CMD ["serve", "-s", "build", "-l", "5000"]
