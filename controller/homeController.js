const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const {getSantizedInfo} = require('../controller/sanitizeData')
const {sanitize} = require("express-validator");
const _ = require('lodash');

const printView = (req, res, next) => {
    var reqData = req.body;
    res.render("print_report", {data: req.body});
}

const generatePdfParent = async (req, res, next) => {

    for (let i = 0; i < 1; i++) {
        const info = getInfo(req.body, i);
        if(!_.isEmpty(info.data.testDate)){
            generatePdf(info);
        }
        
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
    const sanitizedData = getSantizedInfo(info);
    return sanitizedData;
}

const generatePdf = async (info) => {

    const test1 = info.data.testDate.substring(0, 10).replaceAll('/', '-');

    const sampleDate = info.data.testDate.substring(0, info.data.testDate.indexOf(" "));
    const sampleTime = info.data.testDate.substring(info.data.testDate.indexOf(" "));

    info.data.printDate = info.data.printDate.substring(0, info.data.printDate.indexOf(" "));
    info.data.printTime = info.data.printDate.substring(info.data.printDate.indexOf(" "));

    info.data.testDate = sampleDate.replaceAll('/','-');
    info.data.testTime = sampleTime;

    console.log(">>>>> Date: " + sampleDate);
    console.log(">>>>> Time: " + sampleTime);

    const html = fs.readFileSync(path.join(__dirname, '../views/print_report.html'), 'utf-8');
    const filename = info.data.patient_name + '_' + info.data.ipd + '_' + test1 + '.pdf';

    const document = {
        html: html,
        data: info,
        path: './docs/' + filename
    }

    const options = {
        format: 'A4',
        orientation: 'portrait',
        base: "file:///home/www/",
        border: '30px',
        borderLeft: '60px',
        header: {
            height: '175px'
        },
        footer: {
            height: '130px',
            contents: {
                default: '<div id="pageFooter">\n' +
                    '            <div class="ui horizontal segments" style="overflow: hidden; white-space: nowrap; border: none">\n' +
                    '                <div class="left aligned ui segment" style="margin-top: 40px">\n' +
                    '                    <p style="font-size: 9px!important; font-weight: 900;' +
                    ' padding-left: 30px;">TECHNOLOGIST</p>\n' +
                    '                </div>\n' +
                    '                <div class="right aligned ui segment" style="border-left: 0">\n' +
                    '                    <img src="https://i.postimg.cc/KRC0X4CC/signature.png" width="100px"' +
                    ' alt="Signature alt">\n' +
                    '                    <p style="font-size: 8px!important;"><span style="font-weight:' +
                    ' 900;font-size: 9px!important;">Dr.' +
                    ' Shweta</span><br/>\n' +
                    '                        MBBS, MD(PATHOLOGY)<br/>\n' +
                    '                        (EX. PGIMER, CHD)\n' +
                    '                    </p>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <div class="center aligned ui segment">\n' +
                    '                <p style="font-size: 9px!important; font-weight: 900;">Page {{page}} of {{pages}}\n' +
                    '                </p>\n' +
                    '            </div>\n' +
                    '        </div>',
                last: '<div id="pageFooter">\n' +
                    '            <div class="ui horizontal segments" style="overflow: hidden; white-space: nowrap; border: none">\n' +
                    '                <div class="left aligned ui segment" style="margin-top: 40px">\n' +
                    '                    <p style="font-size: 9px!important; font-weight: 900;' +
                    ' padding-left: 30px;">TECHNOLOGIST</p>\n' +
                    '                </div>\n' +
                    '                <div class="right aligned ui segment" style="border-left: 0">\n' +
                    '                    <img src="https://i.postimg.cc/KRC0X4CC/signature.png" width="100px"' +
                    ' alt="Signature alt">\n' +
                    '                    <p style="font-size: 8px!important;"><span style="font-weight:' +
                    ' 900;font-size: 9px!important;">Dr.' +
                    ' Shweta</span><br/>\n' +
                    '                        MBBS, MD(PATHOLOGY)<br/>\n' +
                    '                        (EX. PGIMER, CHD)\n' +
                    '                    </p>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <div class="center aligned ui segment">\n' +
                    '                <p style="font-size: 9px!important; font-weight: 900;">End of Report\n' +
                    '                </p>\n' +
                    '            </div>\n' +
                    '        </div>'
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

}

module.exports = {
    printView, generatePdfParent
};