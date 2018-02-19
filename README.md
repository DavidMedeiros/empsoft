# Form Review

Aplicação web para a facilidade na revisão de código.

## Guia para instalação da aplicação

### Dependências

 - [NodeJS](https://nodejs.org/en/download/) - Framework Javascript para o desenvolvimento do servidor
 - [MongoDB]( https://www.mongodb.com/download-center?jmp=tutorials&_ga=2.186482657.957555586.1512135851-1100509223.1505756680#community) - Banco de dados não-relacional
 - [Robo3T](https://robomongo.org/) (Opcional) - Interface de visualização do BD

As versões das tecnologias usadas atualmente são: 

 - NodeJS v6.11
 - MongoDB v3.4

### Passos para a instalação

 1. Instalar o NodeJS
 
 2. Instalar o MongoDB
	 2.1 Criar diretórios para o MongoDB, o default é <i>`C:/data/db`</i>
	 
 3. Executar `npm install` no diretório da aplicação
 
 4. Executar o mongod (localizado no diretório de instalação do MongoDB)
 
 5. Executar `npm start` no diretório da aplicação
 
 6. OPCIONAL - Executar o Robo3T e conectar ao banco de dados, a porta default é :27017