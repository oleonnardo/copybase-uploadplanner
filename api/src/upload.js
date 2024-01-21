const express = require('express');
const router = express.Router();
const multer = require('multer');

let upload = multer({
    destination: './assets/uploads/'
})

router.post('/', upload.array('file'), async (request, response) => {
    response.status(200).send({
        message: 'Deu certo'
    })
    /*
     response.send({
         upload: true,
         files: request.files
     });*/
});

module.exports = router;