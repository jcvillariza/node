
import express from 'express';
import bodyParser from 'body-parser';

const jwt = require('express-jwt');
const rsa = require('jwks-rsa');

import routes from './routes/index.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(`Error: ${res}`);
    next();
});

const jwt_check = jwt({
    secret: rsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-villariza.auth0.com/.well-known/jwks.json`
    }),

    audience: 'https://dev-villariza.auth0.com/api/v2/',
    issuer: `https://dev-villariza.auth0.com/`,
    algorithms: ['RS256']
});

app.use(jwt_check);

routes(app);

export default app;