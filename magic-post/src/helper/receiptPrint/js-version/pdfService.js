const html2canvas = require('html2canvas');
const jsPDF = require('jspdf');

exports.generatePdf = function(element) {
    return html2canvas(element).then((canvas) => {
        const base64image = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px', [1600, 1131]);
        pdf.addImage(base64image, 'PNG', 15, 15, 1110, 360);
        pdf.save('webtylepress-two.pdf');
    });
};