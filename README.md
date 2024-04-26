## Descrição

Projeto Back-end para testar integração entre nodejs, TypeScript, keycloak de forma produtiva.


## Instalação

* Node.js
* Faça o clone do projeto
* Execute o comando ```npm install```

## Rodar o projeto
cd keycloak * ```docker-compose up```

cd express-api
* ```npm start``` - Executa a aplicação com ts-node e roda um servidor em http://localhost:3001 para testar o projeto.

cd express-web
* ```npm start``` - Executa a aplicação com ts-node e roda um servidor em http://localhost:3000 para testar o projeto.


## keycloak Login
```
http://localhost:8080/
Username: admin
Password: teste1234
```

## App Login 

```
http://localhost:3000
Username: testuser-1
password: testuser1
```

## App endpoints
```
http://localhost:3000/fullstack

http://localhost:3000/backend

http://localhost:3000/consume-api -> repassa o token para o endpoint da api que é validado via chave publica (api deve estar rodando)

```


## App Logout 
```
localhost:3000/logout
```