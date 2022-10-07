const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const {getSantizedInfo} = require('../controller/sanitizeData')
const _ = require('lodash');

const printView = (req, res, next) => {
    var reqData = req.body;
    res.render("print_report", {data: req.body});
}

const generatePdfParent = async (req, res) => {

    const files = [];
    for (let i = 0; i < 7; i++) {
        const info = getInfo(req.body, i);
        if(!_.isEmpty(info.data.testDate)){
            if(_.isEmpty(info.data.printDate)) {
                info.data.printDate = info.data.testDate;
            }
            const test1 = info.data.testDate.substring(0, 10).replaceAll('/', '-');
            const filename = info.data.patient_name + '_' + info.data.ipd + '_' + test1 + '.pdf';
            files.push(filename);
            generatePdf(info, filename);
        }
    }
    //console.info(">>>>>>>> files:   " + files);
    res.files = files;
    //res.render('print_report');
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
    return getSantizedInfo(info);
}

const generatePdf = async (info, filename) => {

    //const test1 = info.data.testDate.substring(0, 10).replaceAll('/', '-');

    const sampleDate = info.data.testDate.substring(0, info.data.testDate.indexOf(" "));
    const sampleTime = info.data.testDate.substring(info.data.testDate.indexOf(" "));

    const printDate = info.data.printDate.substring(0, info.data.printDate.indexOf(" "));
    const printTime = info.data.printDate.substring(info.data.printDate.indexOf(" "));

    info.data.testDate = sampleDate.replaceAll('/','-');
    info.data.testTime = sampleTime;

    info.data.printDate = printDate.replaceAll('/','-');
    info.data.printTime = printTime;

    const html = fs.readFileSync(path.join(__dirname, '../views/print_report.html'), 'utf-8');
    //const filename = info.data.patient_name + '_' + info.data.ipd + '_' + test1 + '.pdf';

    const document = {
        html: html,
        data: info,
        path: './docs/' + filename
    }

    const options = {
        format: 'A4',
        orientation: 'portrait',
        base: "file:///home/www/",
        border: {
			left: '60px',
			right: '30px',
			top: '0px',
			bottom: '0px'
		},
        header: {
            height: '220px'
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

}

module.exports = {
    printView, generatePdfParent
};