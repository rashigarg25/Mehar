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
    const filename = Math.random() + '_doc' + '.pdf';

    const document = {
        html: html,
        data: req.body,
        path: './docs/' + filename
    }

    const options = {
        formate: 'A4',
        orientation: 'portrait',
        border: '2mm',
        header: {
            height: '15mm',
            contents:`<h6>Name: ${req.body.patient_name}</h6>`
        },
        footer: {
            height: '20mm',
            contents: {
                first: 'Cover page',
                2: 'Second page',
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', 
                last: 'Last Page'
            }
        }
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