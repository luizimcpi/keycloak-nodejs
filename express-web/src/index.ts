import express from 'express';
import keycloak, { memoryStore } from './keycloak';
import session from 'express-session';
import axios from 'axios';


var app = express();

app.use(
  session({
    secret: '1234567890',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
    cookie: {
      maxAge: 1000 * 60 * 10 //10 minutos
    }
  })
)

app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}))

app.get('/', keycloak.protect(), function(req, res, next){
  //@ts-ignore
  console.log("access_token " + req.kauth.grant.access_token);
  //@ts-ignore
  console.log("id_token "+ req.kauth.grant.id_token);
  //@ts-ignore
  console.log("id_token " + req.kauth.grant.id_token.content);
  res.json('Hello World');
})

app.get('/fullstack', keycloak.protect("realm:fullstack-developer"), function(req, res, next){
  res.json('Hi fullstack developer');
})

app.get('/backend', keycloak.protect("realm:backend-developer"), function(req, res, next){
  res.json('Hi backend developer');
})

app.get('/consume-api', keycloak.protect(), async (req, res, next) => {
  try {
      const {data}  = await axios.get('http://localhost:3001', {
      headers: {
        //@ts-ignore
        Authorization: `Bearer ${req.kauth.grant.access_token.token}`
      }
    });
    res.json(data);
  }catch(e){
    res.status(500).json({message: e.message});
  }
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Running in http://localhost:3000')
})
