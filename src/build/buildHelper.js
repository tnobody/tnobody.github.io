var fs = require('fs');
var _ = require('lodash');

var templateCache = {};

function getTemplate(templateFile) {
    var data = fs.readFileSync(templateFile, 'utf8')
    var compiled = _.template(data);
    return compiled;
}

module.exports = {
    getTemplate: getTemplate
};