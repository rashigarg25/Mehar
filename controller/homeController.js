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

    const test1 = info.testDate.substring(0, 2).replace('/\//g', '-');

    const sampleDate = info.testDate.substring(0, info.testDate.indexOf(" "));
    const sampleTime = info.testDate.substring(info.testDate.indexOf(" "));

    info.sampleDate = sampleDate.replaceAll('/','-');
    info.sampleTime = sampleTime;
    console.log(">>>>> Date: " + sampleDate);
    console.log(">>>>> Time: " + sampleTime);

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
                    '                    <p style="font-family: Tahoma, serif; font-size: 8px;' +
                    ' font-weight: 900">TECHNOLOGIST</p>\n' +
                    '                </div>\n' +
                    '                <div class="right aligned ui segment" style="border-left: 0">\n' +
                    '                    <img src="https://i.postimg.cc/KRC0X4CC/signature.png" width="100px"' +
                    ' alt="Signature alt">\n' +
                    '                    <p><b>Dr. Shweta</b><br/>\n' +
                    '                        MBBS, MD(PATHOLOGY)<br/>\n' +
                    '                        (EX. PGIMER, CHD.)\n' +
                    '                    </p>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <div class="center aligned ui segment">\n' +
                    '                <p><b>Page {{page}} of {{pages}}</b>\n' +
                    '                </p>\n' +
                    '            </div>\n' +
                    '        </div>',
                last: '<div id="pageFooter">\n' +
                    '            <div class="ui horizontal segments" style="overflow: hidden; white-space: nowrap; border: none">\n' +
                    '                <div class="left aligned ui segment" style="margin-top: 40px">\n' +
                    '                    <h3>TECHNOLOGIST</h3>\n' +
                    '                </div>\n' +
                    '                <div class="right aligned ui segment" style="border-left: 0">\n' +
                    '                    <img src="https://i.postimg.cc/KRC0X4CC/signature.png" width="100px">\n' +
                    '                    <p><b>Dr. Shweta</b><br/>\n' +
                    '                        MBBS, MD(PATHOLOGY)<br/>\n' +
                    '                        (EX. PGIMER, CHD.)\n' +
                    '                    </p>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <div class="center aligned ui segment">\n' +
                    '                <p><b>End of Report</b>\n' +
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