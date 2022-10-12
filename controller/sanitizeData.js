const _ = require('lodash');

module.exports.getSantizedInfo = (info) => {

    if(!_.isEmpty(info.neutrophils) || !_.isEmpty(info.lymphocytes) || !_.isEmpty(info.monocyte) || !_.isEmpty(info.eosinophils) || !_.isEmpty(info.basophils)){

        info.neutrophils = _.isEmpty(info.neutrophils) ? 0 : info.neutrophils;
        info.lymphocytes = _.isEmpty(info.lymphocytes) ? 0 : info.lymphocytes;
        info.monocyte = _.isEmpty(info.monocyte) ? 0 : info.monocyte;
        info.eosinophils = _.isEmpty(info.eosinophils) ? 0 : info.eosinophils;
        info.basophils = _.isEmpty(info.basophils) ? 0 : info.basophils;
        info.dlc = ".."

    }

    if(!_.isEmpty(info.hb) && !_.isEmpty(info.rbc)){
        info.pcv = (info.hb * 3).toFixed(1);
        info.mcv = ((info.pcv * 10) / info.rbc).toFixed(1);
        info.mch = ((info.hb/info.rbc) * 10).toFixed(1) ;
        info.mchc = ((info.hb/info.pcv) * 100).toFixed(1);
    }

    if(!_.isEmpty(info.inr)) {
        info.ptcontrol = 11.5;
        info.ptpatient = (info.ptcontrol * info.inr).toFixed(1);
        info.index = ((info.ptcontrol/info.ptpatient) * 100).toFixed(1);
    }

    if(!_.isEmpty(info.burea)){
        info.bun = (info.burea/2.14).toFixed(1);
    }

    if(!_.isEmpty(info.bilirubin) && !_.isEmpty(info.cbilirubin)) {
        info.ucbilirubin = ((info.bilirubin - info.cbilirubin) * 1).toFixed(2);
    }

    if(!_.isEmpty(info.tprotein) && !_.isEmpty(info.serumalbumin)) {
        info.globin = ((info.tprotein - info.serumalbumin) * 1).toFixed(2);
        info.agratio = (info.serumalbumin/info.globin).toFixed(1);
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
    sanitizedInfo["sgpt"] = _.pick(removedEmpty, ["sgpt", "alkphosphatase", "tprotein", "serumalbumin", "globin", "agratio"]);
    sanitizedInfo["sgot"] = _.pick(removedEmpty, ["sgot"]);
    sanitizedInfo["liver"] = _.pick(removedEmpty, ["bilirubin", "cbilirubin", "ucbilirubin"]);
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
    sanitizedInfo["widal"] = _.pick(removedEmpty, ["widal"]);
    sanitizedInfo["dengue"] = _.pick(removedEmpty, ["dengue", "dengueigg", "dengueigm"]);
    sanitizedInfo["bloodGroup"] = _.pick(removedEmpty, ["bgroupAbo", "bgroupRh"]);
    sanitizedInfo["data"] = _.pick(removedEmpty, ["patient_name", "uhid", "ipd", "department", "address", "phone", "consultant", "testDate", "testTime", "printDate", "printTime", "ageUnit", "gender", "Age"]);

    sanitizedInfo = _.omitBy(sanitizedInfo, v => _.isEmpty(v));
console.log(sanitizedInfo.bloodGroup);
    return sanitizedInfo;
};