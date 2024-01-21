
const uploadRoute = require('./src/upload');
const corsRoute = require('./src/configCors');

const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express();

// add info ao console.log
app.use(morgan('dev'))

//app.use(cors)
app.use(bodyParser.urlencoded({extended: false})) // apenas dados simples
app.use(bodyParser.json()) // json de entrada no body

app.use(corsRoute);

app.use('/upload/file', express.static('assets/uploads'));
app.use('/upload', uploadRoute)
app.use('/home', (request, response, next) => {
    response.status(200).send({
        message: "Home"
    });
});

app.use((req, resp, next) => {
    const erro = new Error('Rota não encontrada!')
    erro.statusCode = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500);
    return res.send({
        message: error.message
    })
})

module.exports = app;