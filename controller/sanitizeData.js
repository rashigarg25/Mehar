const _ = require('lodash');

module.exports.getSantizedInfo = (info) => {

    const removedEmpty = _.omitBy(info, v => v === '');
    let sanitizedInfo = {};
    sanitizedInfo["blood"] = _.pick(removedEmpty, ["hb", "tlc", "dlc", "neutrophils", "lymphocytes", "monocyte", "eosinophils", "basophils", "rbc", "pcv", "mcv", "mch", "mchc", "rdwcv", "rdwsd", "platelet"]);
    sanitizedInfo["esr"] = _.pick(removedEmpty, ["esr"]);
    sanitizedInfo["crp"] = _.pick(removedEmpty, ["crp"]);
    sanitizedInfo["blood"] = _.pick(removedEmpty, []);
    sanitizedInfo["blood"] = _.pick(removedEmpty, []);
    sanitizedInfo["blood"] = _.pick(removedEmpty, []);
    sanitizedInfo["blood"] = _.pick(removedEmpty, []);
    sanitizedInfo["blood"] = _.pick(removedEmpty, []);
    sanitizedInfo["blood"] = _.pick(removedEmpty, []);




    return sanitizedInfo;

};