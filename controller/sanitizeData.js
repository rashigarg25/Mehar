// noinspection FallThroughInSwitchStatementJS

const _ = require('lodash');
const {testPriceList} = require('../controller/testPriceList');

const getSantizedInfo = (info) => {

    if (!_.isEmpty(info.neutrophils) || !_.isEmpty(info.lymphocytes) || !_.isEmpty(info.monocyte) || !_.isEmpty(info.eosinophils) || !_.isEmpty(info.basophils)) {

        info.neutrophils = _.isEmpty(info.neutrophils) ? 0 : info.neutrophils;
        info.lymphocytes = _.isEmpty(info.lymphocytes) ? 0 : info.lymphocytes;
        info.monocyte = _.isEmpty(info.monocyte) ? 0 : info.monocyte;
        info.eosinophils = _.isEmpty(info.eosinophils) ? 0 : info.eosinophils;
        info.basophils = _.isEmpty(info.basophils) ? 0 : info.basophils;
        info.dlc = ".."
    }

    if (!_.isEmpty(info.hb) && !_.isEmpty(info.rbc)) {
        info.pcv = (info.hb * 3).toFixed(1);
        info.mcv = ((info.pcv * 10) / info.rbc).toFixed(1);
        info.mch = ((info.hb / info.rbc) * 10).toFixed(1);
        info.mchc = ((info.hb / info.pcv) * 100).toFixed(1);
    }

    if (!_.isEmpty(info.inr)) {
        info.ptcontrol = 11.5;
        info.ptpatient = (info.ptcontrol * info.inr).toFixed(1);
        info.index = ((info.ptcontrol / info.ptpatient) * 100).toFixed(1);
    }

    if (!_.isEmpty(info.burea)) {
        info.bun = (info.burea / 2.14).toFixed(1);
    }

    if (!_.isEmpty(info.bilirubin) && !_.isEmpty(info.cbilirubin)) {
        info.ucbilirubin = ((info.bilirubin - info.cbilirubin) * 1).toFixed(2);
    }

    if (!_.isEmpty(info.tprotein) && !_.isEmpty(info.serumalbumin)) {
        info.globin = ((info.tprotein - info.serumalbumin) * 1).toFixed(2);
        info.agratio = (info.serumalbumin / info.globin).toFixed(1);
    }

    if (!_.isEmpty(info.triglycerides)) {
        info.vldl = (info.triglycerides / 5).toFixed(1);

        if (!_.isEmpty(info.totalCholestrol) && !_.isEmpty(info.hdlCholestrol)) {
            info.ldlCholestrol = ((info.totalCholestrol - info.hdlCholestrol - info.vldl) * 1).toFixed(1);
            info.cholesterolRatio = (info.totalCholestrol / info.hdlCholestrol).toFixed(1);
            info.ldlHdlRatio = (info.ldlCholestrol / info.hdlCholestrol).toFixed(1);
        }
    }

    if (!_.isEmpty(info.bleedingTimeMin) || !_.isEmpty(info.bleedingTimeSec)) {
        info.bleedingTimeMin = _.isEmpty(info.bleedingTimeMin) ? 0 : info.bleedingTimeMin;
        info.bleedingTimeSec = _.isEmpty(info.bleedingTimeSec) ? 0 : info.bleedingTimeSec;
    }

    if (!_.isEmpty(info.clottingTimeMin) || !_.isEmpty(info.clottingTimeSec)) {
        info.clottingTimeMin = _.isEmpty(info.clottingTimeMin) ? 0 : info.clottingTimeMin;
        info.clottingTimeSec = _.isEmpty(info.clottingTimeSec) ? 0 : info.clottingTimeSec;
    }

    if(!_.isEmpty(info.widal)) {
        info.typhyo = processWidalData(info.typhyo);
        info.typhyh = processWidalData(info.typhyh);
        info.typhyah = processWidalData(info.typhyah);
        info.typhybh = processWidalData(info.typhybh);
    }
    else {
        info.typhyo = '';
        info.typhyh = '';
        info.typhyah = '';
        info.typhybh = '';
    }

    const removedEmpty = _.omitBy(info, v => v === '');
    let sanitizedInfo = {};
    sanitizedInfo["blood"] = _.pick(removedEmpty, ["hb", "tlc", "dlc", "neutrophils", "lymphocytes", "monocyte", "eosinophils", "basophils", "rbc", "pcv", "mcv", "mch", "mchc", "rdwcv", "rdwsd", "platelet"]);
    sanitizedInfo["esr"] = _.pick(removedEmpty, ["esr"]);
    sanitizedInfo["protein"] = _.pick(removedEmpty, ["crp"]);
    sanitizedInfo["kidney"] = _.pick(removedEmpty, ["burea", "creatinine", "uric", "bun"]);
    sanitizedInfo["sodium"] = _.pick(removedEmpty, ["sodium"]);
    sanitizedInfo["potassium"] = _.pick(removedEmpty, ["potassium"]);
    sanitizedInfo["chloride"] = _.pick(removedEmpty, ["chloride"]);
    sanitizedInfo["urine"] = _.pick(removedEmpty, ["quantity", "color", "transparency", "gravity", "reaction", "ph", "albumin", "usugar", "ublood", "ubilirubin", "urobilinogen", "uacetone", "epithelial", "pus", "urbc", "crystals", "casts", "bacteria", "uother"]);
    sanitizedInfo["sgpt"] = _.pick(removedEmpty, ["sgpt"]);
    sanitizedInfo["sgot"] = _.pick(removedEmpty, ["sgot"]);
    sanitizedInfo["liver"] = _.pick(removedEmpty, ["bilirubin", "cbilirubin", "ucbilirubin", "alkphosphatase", "tprotein", "serumalbumin", "globin", "agratio"]);
    sanitizedInfo["coagulation"] = _.pick(removedEmpty, ["ptpatient", "ptcontrol", "index", "isireagent", "inr", "pttk"]);
    sanitizedInfo["serumAmylase"] = _.pick(removedEmpty, ["serumamylase"]);
    sanitizedInfo["serumLipase"] = _.pick(removedEmpty, ["serumlipase"]);
    sanitizedInfo["hiv"] = _.pick(removedEmpty, ["hiv"]);
    sanitizedInfo["hepatitis"] = _.pick(removedEmpty, ["hepatitis"]);
    sanitizedInfo["hcv"] = _.pick(removedEmpty, ["hcv"]);
    sanitizedInfo["vdrl"] = _.pick(removedEmpty, ["vdrl"]);
    sanitizedInfo["bloodSugar"] = _.pick(removedEmpty, [""]);
    sanitizedInfo["bloodGlucose"] = _.pick(removedEmpty, ["bsugar", "bglucose", "pp"]);
    sanitizedInfo["pct"] = _.pick(removedEmpty, ["pct"]);
    sanitizedInfo["dimer"] = _.pick(removedEmpty, ["dimer"]);
    sanitizedInfo["serumFerritin"] = _.pick(removedEmpty, ["serumferritin"]);
    sanitizedInfo["malaria"] = _.pick(removedEmpty, ["malaria"]);
    sanitizedInfo["widal"] = _.pick(removedEmpty, ["widal", "typhyo", "typhyh", "typhyah", "typhybh"]);
    sanitizedInfo["dengue"] = _.pick(removedEmpty, ["dengue", "dengueigg", "dengueigm"]);
    sanitizedInfo["bloodGroup"] = _.pick(removedEmpty, ["bgroupAbo", "bgroupRh"]);
    sanitizedInfo["calcium"] = _.pick(removedEmpty, ["calcium"]);
    sanitizedInfo["cpkMb"] = _.pick(removedEmpty, ["cpkMb"]);
    sanitizedInfo["lipidProfile"] = _.pick(removedEmpty, ["totalCholestrol", "triglycerides", "hdlCholestrol", "ldlCholestrol", "vldl", "cholesterolRatio", "ldlHdlRatio"]);
    sanitizedInfo["bleedingTime"] = _.pick(removedEmpty, ["bleedingTimeMin", "bleedingTimeSec"]);
    sanitizedInfo["clottingTime"] = _.pick(removedEmpty, ["clottingTimeMin", "clottingTimeSec"]);
    sanitizedInfo["vitB12"] = _.pick(removedEmpty, ["vitB12"]);
    sanitizedInfo["troponinT"] = _.pick(removedEmpty, ["troponinT"]);
    sanitizedInfo["troponinI"] = _.pick(removedEmpty, ["troponinI"]);
    sanitizedInfo["vitD3"] = _.pick(removedEmpty, ["vitD3"]);
    sanitizedInfo["thyroid"] = _.pick(removedEmpty, ["t3", "t4", "tsh"]);
    sanitizedInfo["prolactin"] = _.pick(removedEmpty, ["prolactin"]);
    sanitizedInfo["sFsh"] = _.pick(removedEmpty, ["sFsh"]);
    sanitizedInfo["sLh"] = _.pick(removedEmpty, ["sLh"]);
    sanitizedInfo["abg"] = _.pick(removedEmpty, ["phAbg", "pco2", "po2", "beecf", "hco3", "so2", "na", "k", "ica", "hct", "abgHb"]);
    sanitizedInfo["rhFactor"] = _.pick(removedEmpty, ["rhFactor"]);
    sanitizedInfo["antiCcp"] = _.pick(removedEmpty, ["antiCcp"]);
    sanitizedInfo["ca125"] = _.pick(removedEmpty, ["ca125"]);
    sanitizedInfo["glycoHb"] = _.pick(removedEmpty, ["glycoHb"]);
    sanitizedInfo["hlaB27"] = _.pick(removedEmpty, ["hlaB27"]);
    sanitizedInfo["typhidot"] = _.pick(removedEmpty, ["typhidotIgm", "typhidotIgg"]);
    sanitizedInfo["serumIron"] = _.pick(removedEmpty, ["serumIron"]);
    sanitizedInfo["totalIron"] = _.pick(removedEmpty, ["totalIron"]);

    sanitizedInfo["data"] = _.pick(removedEmpty, ["patient_name", "uhid", "ipd", "department", "address", "phone", "consultant", "testDate", "testTime", "printDate", "printTime", "ageUnit", "gender", "Age"]);
    sanitizedInfo = _.omitBy(sanitizedInfo, v => _.isEmpty(v));

    return sanitizedInfo;
};

const processWidalData = (type) => {
        let widalData = ["-ve", "-ve", "-ve", "-ve", "-ve"];
        if (!_.isEmpty(type)) {
            switch (type) {
                case "1/320":
                    widalData[4] = "+ve";
                case "1/160":
                    widalData[3] = "+ve";
                case "1/80":
                    widalData[2] = "+ve";
                case "1/40":
                    widalData[1] = "+ve";
                case "1/20":
                    widalData[0] = "+ve";
            }
        }
    return widalData;
}

const getDataForBill = (info) => {
    let testKeys = _.keys(info);

    let returnObject = {};
    let testList = [];
    testKeys.forEach((key) => {
        if (key !== 'data' && testPriceList[key])
            testList.push(testPriceList[key]);
    });
    returnObject.date = info.data.testDate;
    returnObject.testData = testList;
    return returnObject;
}

module.exports = {
    getDataForBill, getSantizedInfo
};