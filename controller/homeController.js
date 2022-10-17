const {getSantizedInfo} = require('../controller/sanitizeData');
const {generatePdf} = require('../controller/generatePdfController');
const _ = require('lodash');


const getCultureReportPdf = async (req, res) => {

    await generatePdf('print_report_culture', {"hello": "hello"}, 'hello.pdf');
}

const getGeneralTestReportPdfs = async (req, res) => {

    const files = [];
    for (let i = 0; i < 7; i++) {

        let completeData = req.body;
        if(!_.isEmpty(completeData.testDate[i])) {
            const info = getInfo(req.body, i);
            if(info.data){
                if(_.isEmpty(info.data.printDate)) {
                    info.data.printDate = info.data.testDate;
                }
                formatDate(info);
                const filename = info.data.patient_name + '_' + info.data.ipd + '_' + info.data.testDate + '.pdf';
                files.push(filename);
                await generatePdf('print_report', info, filename);

            }
        }
    }
    res.files = files;
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

const formatDate = (info) => {
    const sampleDate = info.data.testDate.substring(0, info.data.testDate.indexOf(" "));
    const sampleTime = info.data.testDate.substring(info.data.testDate.indexOf(" "));

    const printDate = info.data.printDate.substring(0, info.data.printDate.indexOf(" "));
    const printTime = info.data.printDate.substring(info.data.printDate.indexOf(" "));

    info.data.testDate = sampleDate.replaceAll('/','-');
    info.data.testTime = sampleTime;

    info.data.printDate = printDate.replaceAll('/','-');
    info.data.printTime = printTime;
}



module.exports = {
    getGeneralTestReportPdfs, getCultureReportPdf
};