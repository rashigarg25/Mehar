const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
//const options = require('../helper/options');

const printView = (req, res, next) => {
    var reqData = req.body;
    res.render("print_report", {data : req.body});
}

const generatePdf = async (req, res, next) => {
    const html = fs.readFileSync(path.join(__dirname, '../views/print_report.html'), 'utf-8');
    const filename = req.body.patient_name + '_' + '.pdf';

    const document = {
        html: html,
        data: req.body,
        path: './docs/' + filename
    }

    const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '50px'
        }
    
    pdf.create(document, options)
        .then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
        const filepath = 'http://localhost:3000/docs/' + filename;

        res.render('print_report', {
            path: filepath,
            data: req.body
        });
}

module.exports = {
    printView, generatePdf
};