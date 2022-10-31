const {getSantizedInfo, getDataForBill} = require('../controller/sanitizeData');
const {generatePdf} = require('../controller/generatePdfController');
const _ = require('lodash');
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");

const getCultureReportPdf = async (req, res) => {

    for (let i = 0; i < 7; i++) {
        let completeData = req.body;
        if (!_.isEmpty(completeData.testDate[i])) {
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
    let billList = [];
    let patientData = {};
    for (let i = 0; i < 7; i++) {

        let completeData = req.body;

        if (!_.isEmpty(completeData.testDate[i])) {
            let info = getInfo(req.body, i);
            info = getSantizedInfo(info)
            if (info.data) {
                if (_.isEmpty(info.data.printDate)) {
                    info.data.printDate = info.data.testDate;
                }
                formatDate(info);
                const filename = info.data.patient_name + '_' + info.data.ipd + '_' + info.data.testDate + '_' + info.data.testTime.replaceAll(':', '').substring(0, 5) + '.pdf';
                files.push(filename);
                await generatePdf('print_report', info, filename);

            }

            // Check if date exists in the billList array
            let obj = billList.find(meta => meta.date === info.data.testDate);

            //  If not, add a new entry
            if (obj === undefined) {

                billList.push(getDataForBill(info));
            }
            // If exists, it means multiple tests done on same date. Append tests to the existing array of tests
            else {
                Array.prototype.push.apply(obj.testData, getDataForBill(info).testData)
            }
            patientData = info.data;
        }
    }

    // Calculate the grand total for bill generated and add to the JSON
    let total = 0;

    billList.forEach(dateWiseBill => {
        dateWiseBill.testData.forEach(test => total += test.testPrice);
    });

    const filename = patientData.patient_name + '_bill.docx';
    files.push(filename);
    let billData = {};
    billData["billList"] = billList;
    billData["data"] = patientData;

    // Write DOCX template
    const content = fs.readFileSync(
        "bill_template.docx",
        "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render({
        grand_total: total,
        patient_name: billData.data.patient_name,
        ipd_number: billData.data.ipd,
        billList: billData.billList,
    });

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });

    // buf is a nodejs Buffer, you can either write it to a file or res.send it with express.
    fs.writeFileSync(path.resolve("./docs/" + filename), buf);

    res.files = files;
}

const getInfo = (body, i) => {

    const keys = Object.keys(body);
    const info = {};

    keys.forEach((element, index) => {
        if (Array.isArray(body[element])) {
            info[element] = body[element][i];
        } else {
            info[element] = body[element];
        }
    });
    info.cultureForBill = body["cultureForBill-" + i];
    if(!_.isArray(info.cultureForBill)) {
        info.cultureForBill = [info.cultureForBill];
    }
    return info;
}

const formatDate = (info) => {
    const sampleDate = info.data.testDate.substring(0, info.data.testDate.indexOf(" "));
    const sampleTime = info.data.testDate.substring(info.data.testDate.indexOf(" "));

    const printDate = info.data.printDate.substring(0, info.data.printDate.indexOf(" "));
    const printTime = info.data.printDate.substring(info.data.printDate.indexOf(" "));

    info.data.testDate = sampleDate.replaceAll('/', '-');
    info.data.testTime = sampleTime;

    info.data.printDate = printDate.replaceAll('/', '-');
    info.data.printTime = printTime;
}


module.exports = {
    getGeneralTestReportPdfs, getCultureReportPdf
};