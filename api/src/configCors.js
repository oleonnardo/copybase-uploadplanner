const express = require('express');
const routerCors = express.Router();

routerCors.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        
        return res.status(200).send({
            message: "Method OPTIONS not allowed."
        });
    }
   
    next();
});

module.exports = routerCors;