import models from '../models/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';
import PDFDocument from 'pdfkit';
import pdfMakePrinter from 'pdfmake/src/printer.js';
import pdfMakeUni from 'pdfmake-unicode';
import ExcelJS from 'exceljs';
import publicacion from '../models/publicacion.js';
import pdf from 'html-pdf';
import pdfTemplate from '../prueba/public/pdfTemplate.js';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Publicacion, Usuario } = models;

process.env.OPENSSL_CONF = '/dev/null';

export const descargarPDF = async (req, res) => {
  let consulta = {};
  try {
    const parametrosBusqueda = req.body;

    Object.keys(parametrosBusqueda).forEach((key) => {
      if (
        parametrosBusqueda[key] !== "" &&
        parametrosBusqueda[key] !== undefined
      ) {
        consulta[key] = parametrosBusqueda[key];
      }
    });

    if (parametrosBusqueda.fechaFin) {
      const fechaFin = new Date(parametrosBusqueda.fechaFin);
      fechaFin.setHours(23, 59, 59); // Establecer la hora de finalización a las 23:59:59
      consulta.createdAt = consulta.createdAt || {};
      consulta.createdAt.$lte = fechaFin;
    }

    if (parametrosBusqueda.fechaInicio) {
      const fechaInicio = new Date(parametrosBusqueda.fechaInicio);
      consulta.createdAt = consulta.createdAt || {};
      consulta.createdAt.$gte = fechaInicio;
    }

    let publicaciones = await Publicacion.find(consulta);
    if (
      parametrosBusqueda.horaFin != undefined &&
      parametrosBusqueda.horaFin.includes(":")
    ) {
      const FechahoraFin = convertToEcuadorTimeZone(
        new Date(parametrosBusqueda.horaFin)
      );
      const horaFin = FechahoraFin.getHours();
      const minutosFin = FechahoraFin.getMinutes();
      const documentosHoraFin = publicaciones.filter((publicacion) => {
        const hora = publicacion.createdAt.getHours();
        const minutos = publicacion.createdAt.getMinutes();

        return hora < horaFin || (hora === horaFin && minutos <= minutosFin);
      });
      publicaciones = documentosHoraFin;
    }

    if (
      parametrosBusqueda.horaInicio != undefined &&
      parametrosBusqueda.horaInicio.includes(":")
    ) {
      const FechahoraInicio = convertToEcuadorTimeZone(
        new Date(parametrosBusqueda.horaInicio)
      );
      const horaInicio = FechahoraInicio.getHours();
      const minutosInicio = FechahoraInicio.getMinutes();
      const documentosHoraInicio = publicaciones.filter((publicacion) => {
        const hora = publicacion.createdAt.getHours();
        const minutos = publicacion.createdAt.getMinutes();
        return (
          hora > horaInicio || (hora === horaInicio && minutos >= minutosInicio)
        );
      });
      publicaciones = documentosHoraInicio;
    }

    console.log(publicaciones);

    //TODO: total usuarios
    const totalUsuarios = await Usuario.countDocuments();
    console.log(totalUsuarios);//46

    //TODO: total publicaciones por dia, dia acutal
    const fechaActual = new Date();

    const fechaInicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate(), 0, 0, 0);
    const fechaFin = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate(), 23, 59, 59);

    const totalPublicacionesDia = await Publicacion.countDocuments({
      createdAt: {
        $gte: fechaInicio,
        $lte: fechaFin
      }
    });
    console.log(totalPublicacionesDia);//29

    //TODO: total publicaciones por MES, mes actual
    const fechaInicioMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1, 0, 0, 0);
    const fechaFinMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0, 23, 59, 59);

    const totalPublicacionesMes = await Publicacion.countDocuments({
      createdAt: {
        $gte: fechaInicioMes,
        $lte: fechaFinMes
      }
    });

    console.log(publicaciones);//29

    //taotal publicaciones registradas en el sistema
    const totalPublicacionesCoutn = await Publicacion.countDocuments();

    //objeto de persona con nombre y edad
    const dataInfo = {
      totalUsuarios: totalUsuarios,
      totalPublicacionesDia: totalPublicacionesDia,
      totalPublicacionesMes: totalPublicacionesMes,
      publicaciones: publicaciones,
      totalPublicacionesCoutn: totalPublicacionesCoutn
    }

    const pdfOptions = {
      childProcessOptions: {
        env: {
          OPENSSL_CONF: '/dev/null', // Configuración para evitar problemas SSL
        },
      },
    };

    // Configurar los encabezados de la respuesta para descargar el archivo PDF
    const filename = "Reporte_IncidentesUE.pdf";
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    // Obtener la ruta absoluta de las fuentes Roboto
    const fonts = {
      Roboto: {
        normal: readFileSync(
          path.join(__dirname, '../../../fonts/Roboto-Regular.ttf')
        ),
        bold: readFileSync(
          path.join(__dirname, '../../../fonts/Roboto-Medium.ttf')
        ),
      },
    };

    // Crear un objeto de definición de PDF utilizando pdfmake
    const printer = new pdfMakePrinter(fonts);
    const docDefinition = {
      content: [
        { text: "Lista de Publicaciones", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                { text: "Título", style: "header2" },
                { text: "Contenido", style: "header2" },
                { text: "Ciudad", style: "header2" },
                { text: "Barrio", style: "header2" },
                { text: "Nombre de Usuario", style: "header2" },
                { text: "Latitud", style: "header2" },
                { text: "Longitud", style: "header2" },
              ],
              ...publicaciones.map((publicacion) => [
                publicacion.titulo,
                publicacion.contenido,
                publicacion.ciudad,
                publicacion.barrio,
                publicacion.nombreUsuario,
                publicacion.latitud.toString(),
                publicacion.longitud.toString(),
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
        },
        header2: {
          fontSize: 12,
          bold: true,
          alignment: "center",
        },
      },
    };

    // Crear el documento PDF utilizando pdfmake
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(res);
    pdfDoc.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};