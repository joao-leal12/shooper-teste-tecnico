Aplicação Shopper Drive
Este projeto é uma aplicação de transporte compartilhado que simula um sistema semelhante ao Uber. Ele está configurado para rodar em contêineres Docker, permitindo que você configure o ambiente rapidamente.

Instruções para Uso: 

Requisitos: 

Antes de iniciar, certifique-se de que você possui os seguintes itens instalados em sua máquina:

Docker
Docker Compose

Configuração
1. Clonar o Repositório
Faça o clone do repositório do projeto: <br/>

Copiar código
git clone https://github.com/seu-usuario/nome-do-repositorio.git <br/>
cd nome-do-repositorio <br/> 
2. Configurar Variáveis de Ambiente: <br/>
Crie os arquivos .env para o frontend e o backend. Use os das chaves de exemplo de cada projeto .env.example:<br/>

3. Subir os Contêineres
Para rodar a aplicação, utilize o Docker Compose:

Copiar código
docker-compose up 
Isso irá:

Rodar o frontend na porta 80 (acesse http://localhost).<br/>
Rodar o backend na porta 8080 (acesse http://localhost:8080). <br/>
Criar schemas e tabelas do banco e deixar uma instancia rodandona porta 5732
