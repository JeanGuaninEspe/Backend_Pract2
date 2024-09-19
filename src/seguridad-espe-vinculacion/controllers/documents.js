import pdf from 'html-pdf';
import pdfTemplate from '../prueba/public/pdfTemplate.js';
import path from "path";

export const createDocument = async (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('Reporte_IncidentesUE.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
};

export const getDocument = async (req, res) => {
    res.sendFile(path.join(__dirname, '../../../uploads/Reporte_IncidentesUE.pdf'));
};

export default { createDocument, getDocument };