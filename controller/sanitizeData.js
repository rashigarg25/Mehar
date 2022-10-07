const _ = require('lodash');

module.exports.getSantizedInfo = (info) => {

    switch(info.consultantD) {
        case "risham":
            info.consultant = "Dr. Risham Singla";
            info.department = "Orthopedics";
            break;
        case "alka":
            info.consultant = "Dr. Risham Singla";
            info.department = "Orthopedics";
            break;
        case "arsha":
            info.consultant = "Dr. Risham Singla";
            info.department = "Orthopedics";
            break;
        default:
            info.consultant = "Dr. Default";
            info.department = "Default";
            break;
    }


    console.log("consultant --> " + info.consultant + "   " + info.department);

    let dr_mapping = {
        "risham" : {
            "name": "Dr. Risham Singla",
            "department": "Orthopedics"
        },
        "alka" : {
            "name": "Dr. Alka Singla",
            "department": "Gynaecologist"
        },
        "arsha" : {
            "name": "Dr. Arsha Kalra",
            "department": "Pediatrician"
        }
    }

    if(!_.isEmpty(info.hb) && !_.isEmpty(info.rbc)){
        info.pcv = info.hb * 3;
        info.mcv = (info.pcv * 10) / info.rbc;
        info.mch = info.hb/info.rbc;
        info.mchc = (info.hb/info.pcv) * 100;
    }

    if(!_.isEmpty(info.inr)) {
        info.ptcontrol = 11.5;
        info.ptpatient = info.ptcontrol * info.inr;
        info.index = (info.ptcontrol/info.ptpatient) * 100;
    }

    if(!_.isEmpty(info.burea)){
        info.bun = info.burea/2.14;
    }

    if(!_.isEmpty(info.bilirubin) && !_.isEmpty(info.cbilirubin)) {
        info.ucbilirubin = info.bilirubin - info.cbilirubin;
    }

    if(!_.isEmpty(info.tprotein) && !_.isEmpty(info.serumalbumin)) {
        info.globin = info.tprotein - info.serumalbumin;
        info.agratio = info.serumalbumin/info.globin;
    }

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
    sanitizedInfo["bloodSugar"] = _.pick(removedEmpty, ["bsugar"]);
    sanitizedInfo["bloodGlucose"] = _.pick(removedEmpty, ["bglucose", "pp"]);
    sanitizedInfo["pct"] = _.pick(removedEmpty, ["pct"]);
    sanitizedInfo["dimer"] = _.pick(removedEmpty, ["dimer"]);
    sanitizedInfo["serumFerritin"] = _.pick(removedEmpty, ["serumferritin"]);
    sanitizedInfo["malaria"] = _.pick(removedEmpty, ["malaria"]);
    sanitizedInfo["widal"] = _.pick(removedEmpty, ["widal"]);
    sanitizedInfo["dengue"] = _.pick(removedEmpty, ["dengue", "dengueigg", "dengueigm"]);
    sanitizedInfo["data"] = _.pick(removedEmpty, ["patient_name", "uhid", "ipd", "department", "address", "phone", "consultant", "testDate", "testTime", "printDate", "printTime", "ageUnit", "gender"]);

    sanitizedInfo = _.omitBy(sanitizedInfo, v => _.isEmpty(v));

    return sanitizedInfo;
};