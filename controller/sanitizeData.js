const _ = require('lodash');

module.exports.getSantizedInfo = (info) => {

    const removedEmpty = _.omitBy(info, v => v === '');
    let sanitizedInfo = {};
    sanitizedInfo["blood"] = _.pick(removedEmpty, ["hb", "tlc", "dlc", "neutrophils", "lymphocytes", "monocyte", "eosinophils", "basophils", "rbc", "pcv", "mcv", "mch", "mchc", "rdwcv", "rdwsd", "platelet"]);
    sanitizedInfo["esr"] = _.pick(removedEmpty, ["esr"]);
    sanitizedInfo["protein"] = _.pick(removedEmpty, ["crp"]);
    sanitizedInfo["kidney"] = _.pick(removedEmpty, ["burea", "creatinine", "uric"]);
    sanitizedInfo["sodium"] = _.pick(removedEmpty, ["sodium"]);
    sanitizedInfo["potassium"] = _.pick(removedEmpty, ["potassium"]);
    sanitizedInfo["chloride"] = _.pick(removedEmpty, ["chloride"]);
    sanitizedInfo["urine"] = _.pick(removedEmpty, ["quantity", "color", "transparency", "gravity", "reaction", "ph", "albumin", "usugar", "ublood", "ubilirubin", "urobilinogen", "uacetone", "epithelial", "pus", "urbc", "crystals", "casts", "bacteria", "uother"]);
    sanitizedInfo["sgpt"] = _.pick(removedEmpty, ["sgpt", "alkphosphatase", "tprotein", "serumalbumin", "globin", "agratio", "ggt"]);
    sanitizedInfo["sgot"] = _.pick(removedEmpty, ["sgot"]);
    sanitizedInfo["liver"] = _.pick(removedEmpty, ["bilirubin", "cbilirubin", "ucbilirubin"]);
    sanitizedInfo["coagulation"] = _.pick(removedEmpty, ["ptpatient", "ptcontrol", "index", "isireagent", "inr", "pttk"]);
    sanitizedInfo["serumAmylase"] = _.pick(removedEmpty, ["serumamylase"]);
    sanitizedInfo["serumLipase"] = _.pick(removedEmpty, ["serumlipase"]);
    sanitizedInfo["hiv"] = _.pick(removedEmpty, ["hiv"]);
    sanitizedInfo["hepatitis"] = _.pick(removedEmpty, ["hepatitis"]);
    sanitizedInfo["hcv"] = _.pick(removedEmpty, ["hcv"]);
    sanitizedInfo["vdrl"] = _.pick(removedEmpty, ["vdrl"]);
    sanitizedInfo["bloodSugar"] = _.pick(removedEmpty, ["bsugar"]);
    sanitizedInfo["bloodGlucose"] = _.pick(removedEmpty, ["bglucose", "pp"]);
    sanitizedInfo["pct"] = _.pick(removedEmpty, ["pct"]);
    sanitizedInfo["dimer"] = _.pick(removedEmpty, ["dimer"]);
    sanitizedInfo["serumFerritin"] = _.pick(removedEmpty, ["serumferritin"]);
    sanitizedInfo["malaria"] = _.pick(removedEmpty, ["malaria"]);
    sanitizedInfo["widal"] = _.pick(removedEmpty, ["widal"]);
    sanitizedInfo["dengue"] = _.pick(removedEmpty, ["dengue", "dengueigg", "dengueigm"]);
    sanitizedInfo["data"] = _.pick(removedEmpty, ["patient_name", "uhid", "ipd", "department", "address", "phone", "consultant", "testDate", "testTime", "printDate", "printTime"]);

    sanitizedInfo = _.omitBy(sanitizedInfo, v => _.isEmpty(v));

    return sanitizedInfo;
};