const {getSantizedInfo, getDataForBill} = require('../controller/sanitizeData');
const {generatePdf} = require('../controller/generatePdfController');
const _ = require('lodash');


const getCultureReportPdf = async (req, res) => {

    for (let i = 0; i < 1; i++) {
        let completeData = req.body;
        if(!_.isEmpty(completeData.testDate[i])) {
            const info = getInfo(req.body, i);
            info.data = {};
            info.data.testDate = info.testDate;
            info.data.printDate = info.printDate;
            formatDate(info);
            info.testDate = info.data.testDate;
            info.testTime = info.data.testTime;
            info.printDate = info.data.printDate;
            info.printTime = info.data.printTime;
            
            info.specimenOthers = info.specimenOthers.toUpperCase();
            info.organism = info.organism.toUpperCase();

            const filename = info.patient_name + '_' + info.ipd + '_' + info.testDate + '_' + info.specimenNature + '_cs.pdf';

            res.file = filename;
            await generatePdf('print_report_culture', info, filename, '190px');
        }
    }
}

const getGeneralTestReportPdfs = async (req, res) => {

    const files = [];
    let billList = {};
    let patientData = {};
    for (let i = 0; i < 7; i++) {

        let completeData = req.body;
        
        if(!_.isEmpty(completeData.testDate[i])) {
            let info = getInfo(req.body, i);
            info = getSantizedInfo(info)
            if(info.data){
                if(_.isEmpty(info.data.printDate)) {
                    info.data.printDate = info.data.testDate;
                }
                formatDate(info);
                const filename = info.data.patient_name + '_' + info.data.ipd + '_' + info.data.testDate + '_' + info.data.testTime.replaceAll(':', '').substring(0, 5) + '.pdf';
                files.push(filename);
                await generatePdf('print_report', info, filename);

            }
            if(!_.has(billList, info.data.testDate)){
                billList[info.data.testDate] = getDataForBill(info);
            }
            else {
                Array.prototype.push.apply(billList[info.data.testDate], getDataForBill(info));
            }
            patientData = info.data;
        }
        
    }
    const filename = patientData.patient_name + '_bill.pdf';
    files.push(filename);
    let billData = {};
    billData["billList"] = billList;
    billData["data"] = patientData;
    await generatePdf('print_bill', billData, filename);

    
    console.log((billData));
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
    return info;
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