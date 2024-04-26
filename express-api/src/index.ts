import express from 'express';
import Token from 'keycloak-connect/middleware/auth-utils/token'
import Signature from 'keycloak-connect/middleware/auth-utils/signature'


var app = express();

//pode utilizar outra biblioteca aqui para validação de um token com a chave publica não necessariamente precisa ser a do keycloak
const protectMiddleware = (req, res, next) => {
  const headers = req.headers;
  const tokenRaw = headers.authorization.split(" ").slice(-1)[0];
  console.log('token Raw '+ tokenRaw);
  const token = new Token(tokenRaw, "express-api"); // deve ser criado um client no keycloak com esse nome
  const signature = new Signature({
    realmUrl: 'http://localhost:8080/realms/my-test-realm',
    publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0YdWsIeiX5HCcs9eQjXDlWFObb3S/lcj8tOyfmg+7Hvq7MlZO6U7SxnHTOJMkO1SxpwFxLW4TyV0ZPOIJ3/ObAEClhQCmtjddHfSUjVAirqoJyxmfga2zvTxiuUrultrCjy2LDt94UswKvGvqX1fU7hAKjmB6U8KRtRckQJA9J8sshj8HnwZ8mAjiqqtN0XYIKShLEq3NvitQUZt70vf1rwe7MGeHDm3K+8zK7S94S06H3TihyitGKOolDUmdAMI8uKHtP9SbO+iKfnW5e6zlQb0l6yb81DYCFI46Pmot6S9ZUOGGpCJxq10VhkOO9W/LMFiP5A23RJ5sedyHg767QIDAQAB',
    minTimeBetweenJwksRequests: 0
  })

//publicKey pode ser obtido nos realm settings do keycloak -> keys -> pegar a public key rsa-generated RS256

  try {
  signature.verify(token, null).then(token => {
    req.user = token;
    next();
  }).catch(err => {
    console.error(err)
    res.status(401).json({message: "Não autorizado"});
  })
  } catch(e) {
    console.error(e);
    res.status(400).json({message: "Token inválido"});
  }
}

app.use(protectMiddleware);


app.get('/', function(req, res, next){
  res.json({key: "value"});
})


app.listen(3001, '0.0.0.0', () => {
  console.log('Running in http://localhost:3001')
})
