const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
//const options = require('../helper/options');

const printView = (req, res, next) => {
    var reqData = req.body;
    res.render("print_report", {data: req.body});
}

const generatePdfParent = async (req, res, next) => {

    for (let i = 0; i < 1; i++) {
        info = getInfo(req.body, i);
        generatePdf(info);
    }
    res.render('print_report');
}

const getInfo = (body, i) => {

    const keys = Object.keys(body);
    const info = {};

    keys.forEach((element, index) => {
        if(Array.isArray(body[element])){
            info[element] = body[element][i];
        }
        else{
            info[element] = body[element];
        }
    });
    return info;
}


const generatePdf = async (info) => {

    var test1 = info.testDate.substring(0, 2).replace('/\//g', '-');
    const html = fs.readFileSync(path.join(__dirname, '../views/print_report.html'), 'utf-8');
    const filename = info.patient_name + '_' + info.ipd + '_' + test1 + '.pdf';

    const document = {
        html: html,
        data: info,
        path: './docs/' + filename
    }

    const options = {
        format: 'A4',
        orientation: 'portrait',
        base: "file:///home/www/",
        border: '10px',
        header: {
            height: '220px'
        }
    }

    pdf.create(document, options)
        .then(res => {
            console.log(res);
        }).catch(error => {
        console.log(error);
    });
    const filepath = 'http://localhost:3000/docs/' + filename;
    
}

module.exports = {
    printView, generatePdfParent
};