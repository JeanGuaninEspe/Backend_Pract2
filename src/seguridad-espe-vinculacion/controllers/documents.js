import pdf from 'html-pdf';
import pdfTemplate from '../prueba/public/pdfTemplate.js';
import path from "path";

export const createDocument = async (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toBuffer((err, buffer) => {
        if (err) {
            return res.status(500).send('Error al generar el PDF');
        }

        res.setHeader('Content-Disposition', 'attachment; filename=Reporte_IncidentesUE.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(buffer);
    });
};

export const getDocument = async (req, res) => {
    res.sendFile(path.join(__dirname, '../../../uploads/Reporte_IncidentesUE.pdf'));
};

export default { createDocument, getDocument };