const express = require('express');
//const xlsx = require('xlsx');
const router = express.Router();
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./assets/uploads/");
    },
    filename: function (req, file, cb) {
        let data = new Date().toISOString();

        data = data.replaceAll(':', '');
        data = data.replaceAll('.', '');

        cb(null, data + '_' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/', upload.single('file'), (req, resp) => {
    req.setTimeout(20000);

    try {
        const file = req.file;

        if (file?.filename == null || file?.filename == undefined) {
            resp.statusCode = 400;
        } else {
            var filePath = file.path;

            const excelData = excelToJson({
                sourceFile: filePath,
                header: {
                    rows: 1
                },
            });

            //fs.remove(filePath);

            return resp.status(200).send({
                success: true,
                data: excelData,
                message: 'The spreadsheet has been loaded.',
            });
        }
    } catch (error) {
        resp.statusCode = 500;
    }
});

module.exports = router;