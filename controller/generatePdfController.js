const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');

const generatePdf = async (template_name, info, filename, headerHeight) => {

    let templatePath = '../views/' + template_name + '.html';
    const html = fs.readFileSync(path.join(__dirname, templatePath), 'utf-8');

    const document = {
        html: html,
        data: info,
        path: './docs/' + filename
    }

    headerHeight = headerHeight ? headerHeight : '270px';

    const options = {
        format: 'A4',
        orientation: 'portrait',
        base: "file:///home/www/",
        border: {
			top: '0px',
			left: '40px',
			right: '30px',
			bottom: '0px'
		},
        header: {
            height: headerHeight
        },
        footer: {
            height: '170px',
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

    await pdf.create(document, options)
        .then(res => {
        }).catch(error => {
        console.log(error);
    });

}


module.exports = {
    generatePdf
};