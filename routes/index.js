const express = require('express');
const path = require('path');
const zip = require('express-zip');

const {getGeneralTestReportPdfs, getCultureReportPdf} = require("../controller/homeController");

const router = express.Router();

router.get('/culture', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/report_culture.html'));
});

router.post("/print_report", (req, res) => {
    getGeneralTestReportPdfs(req, res).then(r => {

            let fileList = [];
            const rootPath = "./docs/";
            res.files.forEach(element => {
                let file = {};
                file.path = rootPath + element;
                file.name = element;
                fileList.push(file);
            });
            res.zip(fileList, req.body.patient_name + ".zip");
        });
    }
);

router.post("/print_report_culture", (req, res) => {
        getCultureReportPdf(req, res).then(r =>  {
            const rootPath = "./docs/";
        res.download(rootPath + res.file);
    });
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/report.html'));
});

module.exports = router;
