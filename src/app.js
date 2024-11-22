import express from 'express';
import bodyParser from 'body-parser';

import fileUpload from 'express-fileupload';
import path from 'path';

import { fileURLToPath } from 'url';

import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors'; // Import cors usando import

const app = express();

export const server = createServer(app);
export const io = new SocketIOServer(server);

// Exportar `server` e `io` después de su inicialización
export default { server, io };

// Obtener la ruta del directorio actual en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.resolve(__dirname, "./seguridad-espe-tesis/prueba/public");
const publicPathvinculacion = path.resolve(__dirname, "./seguridad-espe-vinculacion/prueba/public");

app.use(express.static(publicPath));
app.use(express.static(publicPathvinculacion));

export function initializeSockets() {
    //import("./seguridad-espe-tesis/sockets/socket.js");
    import("./seguridad-espe-vinculacion/sockets/socket.js");
}


app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
      createParentPath: true
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '15MB',extended: true, parameterLimit:50000 }));
app.use(bodyParser.json({ limit: '15MB'}));
app.set('port', 3000 || 3000);
app.use(express.json());

// const cors = require('cors');
app.use( cors() );


import TecnicoRoute from './MIES_APP/routes/tecnico.js';
import AdultoMayorRoute from './MIES_APP/routes/adultoMayor.js';
import SupervisorRoute from './MIES_APP/routes/supervisor.js';
import LawtonRoute from './MIES_APP/routes/escalaLawtonBrody.js';
import YesavageRoute from './MIES_APP/routes/escalaYesavage.js';
import MiniMentalRoute from './MIES_APP/routes/mini_mental.js';
import BarthelRoute from './MIES_APP/routes/indiceBarthel.js';
import EncabezadoRoute from './MIES_APP/routes/encabezado.js';
import ReportesRoute from './MIES_APP/routes/reportes.js';

app.use('',TecnicoRoute);
app.use('',AdultoMayorRoute);
app.use('',SupervisorRoute);
app.use('',LawtonRoute);
app.use('',YesavageRoute);
app.use('',MiniMentalRoute);
app.use('',BarthelRoute);
app.use('',EncabezadoRoute);
app.use('',ReportesRoute);

//encuestas
import Encuesta1Router from './encuestas/routes/encuesta1.routes.js';
import Encuesta2Router from'./encuestas/routes/encuesta2.routes.js'
import EncuestadorRouter from'./encuestas/routes/encuestador.routes.js';
//import PersonaEncRouter from'./encuestas/routes/persona_enc.routes';

app.use('/encuesta1', Encuesta1Router);
app.use('/encuesta2', Encuesta2Router);
app.use('/encuestador', EncuestadorRouter);
//app.use('/persona_enc', PersonaEncRouter);

//=======================================================================================================
//GecSurvey

//RUTA QUE IMPORTA CONTROLADOR
import LoginGecRoute from'./GecSurvey_srv/srv/routes/login.routes.js';
import UsuarioGecRoute from'./GecSurvey_srv/srv/routes/usuario.routes.js';
import EncuestaGecRoute from'./GecSurvey_srv/srv/routes/encuesta.routes.js';
import GraficaGecRoute from './GecSurvey_srv/srv/routes/grafica.routes.js';



//RUTA DE LLAMADO A CONTROLADOR
app.use('/loginGec',LoginGecRoute);
app.use('/usuarioGec',UsuarioGecRoute);
app.use('/encuestaGec',EncuestaGecRoute);
app.use('/graficaGec',GraficaGecRoute);


//------------------------ CAMBIAR DOMINIOO ---------------------------------
// Ruta para la página web en la carpeta "GecSurvey"
app.get("/schoolarSecurityEncuestas",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/index.html');
});

/**
 * Rutas
 */
//favicon
app.get("/gecsurvey/icon",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/favicon.ico');
});

//main
app.get("/gecsurvey/main",(req,res) => {
                                                    //CAMBIAR AQUI POR EL NUEVO
    res.sendFile(__dirname +'/GecSurvey_srv/public/main.f5c3c84a51f937c7.js');
});

//runtine
app.get("/gecsurvey/runtine",(req,res) => {
    //CAMBIAR AQUI POR EL NUEVO
    res.sendFile(__dirname +'/GecSurvey_srv/public/runtime.f6babdf32dc8b875.js');
});

//polyfills
app.get("/gecsurvey/polyfills",(req,res) => {
    //CAMBIAR AQUI POR EL NUEVO
    res.sendFile(__dirname +'/GecSurvey_srv/public/polyfills.7e69f5da7fe5fb5d.js');
});

//styles
app.get("/gecsurvey/styles",(req,res) => {
                                                    //CAMBIAR AQUI POR EL NUEVO
    res.sendFile(__dirname +'/GecSurvey_srv/public/styles.e593eea9978d2649.css');
});

//jquery
app.get("/gecsurvey/jquery",(req,res) => {
                                                        //CAMBIAR AQUI POR EL NUEVO
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/js/jquery-3.6.1.js');
});

/**
 * Imagenes
 */
//Default
app.get("/gecsurvey/assets/img/default/foto",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/default/default_foto.jpg');
});

//logo
app.get("/gecsurvey/assets/img/logos/SE",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/logos/logoSS.png');
});

//portada1
app.get("/gecsurvey/assets/img/portadas/ESPE_STO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/portadas/Espe-Sede-Santo-Domingo.jpg');
});

//Icono Estadistica
app.get("/gecsurvey/assets/img/portadas/Logo_Estadistica",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/iconos/grafico-de-barras.png');
});

//Icono Encuestado
app.get("/gecsurvey/assets/img/portadas/Logo_Encuestados",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/iconos/portapapeles.png');
});

//Icono Seguridad
app.get("/gecsurvey/assets/img/portadas/Logo_Seguridad",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/iconos/seguro.png');
});

//logo ESPE
app.get("/gecsurvey/assets/img/logos/ESPE",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/logos/ESPE.png');
});

//logo ITIN
app.get("/gecsurvey/assets/img/logos/ITIN",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/logos/ITIN.png');
});

//Foto Josue Velasquez
app.get("/gecsurvey/assets/img/administradores/JosueVelasquez",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/JosueVelasquez.png');
});

//Foto Monica Jara
app.get("/gecsurvey/assets/img/administradores/MonicaJara",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/MonicaJara.jpg');
});

//Foto Brandon Bermello
app.get("/gecsurvey/assets/img/administradores/BrandonBermello",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/BrandonBermello.jpg');
});

//Foto Melany Caicedo
app.get("/gecsurvey/assets/img/administradores/MelanyCaicedo",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/MelanyCaicedo.jpg');
});

//Foto Lesly Gaibor
app.get("/gecsurvey/assets/img/administradores/LeslyGaibor",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/LeslyGaibor.jpg');
});

//Foto Brayan Ponce
app.get("/gecsurvey/assets/img/administradores/BrayanPonce",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/BrayanPonce.jpg');
});

//Foto Miguel Ajila
app.get("/gecsurvey/assets/img/administradores/MiguelAjila",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/MiguelAjila.jpg');
});

//Foto Luis Castillo
app.get("/gecsurvey/assets/img/administradores/LuisCastillo",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/LuisCastillo.png');
});

//Foto Veronica Martinez
app.get("/gecsurvey/assets/img/administradores/VeronicaMartinez",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/VeronicaMartinez.png');
});

//Foto Ing. Camino
app.get("/gecsurvey/assets/img/administradores/IngenieroCamino",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/Edwin_Camino.jpg');
});

//Foto Stefany Erazo
app.get("/gecsurvey/assets/img/administradores/StefanyErazo",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/Stefy_Erazo.jpg');
});

//Foto Dayana Vergara
app.get("/gecsurvey/assets/img/administradores/DayanaVergara",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/VergaraDayana.png');
});

//Foto Bryan Cruz
app.get("/gecsurvey/assets/img/administradores/BryanCruz",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/Bryan_Cruz.jpg');
});

//Foto Kevin Azua
app.get("/gecsurvey/assets/img/administradores/KevinAzua",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/Kevin_Azua.png');
});

//Foto Stefanny Hernandez
app.get("/gecsurvey/assets/img/administradores/StefannyHernandez",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/StefyHernandez.png');
});

//Foto Lina
app.get("/gecsurvey/assets/img/administradores/Lina",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/Lina.png');
});

//Foto Steeven
app.get("/gecsurvey/assets/img/administradores/SteevenRiofrio",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/Steveen_Riofrio.png');
});

//Foto Jair
app.get("/gecsurvey/assets/img/administradores/JairSanchez",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/Sanchez.png');
});

//Foto Mateo
app.get("/gecsurvey/assets/img/administradores/MateoBeltran",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/Beltran.jpeg');
});

//Foto Chica
app.get("/gecsurvey/assets/img/administradores/JoshueChica",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/administradores/JoshueChica.png');
});


/**
 * Directorio
 */
//Default
app.get("/gecsurvey/assets/img/default/DEFAULT",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/default/default_foto.jpg');
});

//Organismos
//  ----------------------------------------------------------- LUZ DE AMERICA ------------------------------------------------------------
// GAB LUZ
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/GAD_LUZ",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/LuzDeAmerica/GadLuzDeAmerica.png');
});
//Policia
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/UPC",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/PoliciaNacional.jpg');
});
//MinisterioDeSaludPublica
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/MSP",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/MinisterioDeSaludPublica.jpg');
});
//Bomberos
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/Bomberos",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/Bomberos.jpg');
});
//Popup Organismos
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/GAD/GAD",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/LuzDeAmerica/GadLuz_PopUp.png');
});

app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/UPC/UPC",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/UPC/UPC.jpg');
});

app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/MSP/MSP",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/MSP/MSP.jpg');
});

app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/Bomberos/BOMBEROS",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/Bomberos/Foto1.jpg');
});

//Escuelas
app.get("/gecsurvey/assets/img/DirectorioComunidad/Escuelas/LUZA",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Escuelas/LuzAmerica.jpg');
});

app.get("/gecsurvey/assets/img/DirectorioComunidad/Escuelas/TreceA",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Escuelas/TreceAbril.jpg');
});

//Popup Escuelas
app.get("/gecsurvey/assets/img/DirectorioComunidad/Escuelas/LUZA/FOTO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Escuelas/LuzAmerica/foto1.jpg');
});

app.get("/gecsurvey/assets/img/DirectorioComunidad/Escuelas/TreceA/FOTO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Escuelas/TreceAbril/foto1.jpg');
});

//  ------------------------------------------------------ EL ESFUERZO ---------------------------------------------------------------------
// GAB ESFUERZO
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/GAD_ESFUERZO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/ElEsfuerzo/GadElEsfuerzo.png');
});

//MinisterioDeSaludPublica
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/MSP_ESFUERZO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/MinisterioDeSaludPublica.jpg');
});
//POLICIA
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/Policia_ESFUERZO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/PoliciaNacional.jpg');
});
//*************************** Popup Organismos
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/GAD/GAD_ESFUERZO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/ElEsfuerzo/GadElEsfuerzo_POPUP.png');
});

//MinisterioDeSaludPublica
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/Pop_MSP_ESFUERZO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/ElEsfuerzo/MSP_ElEsfuerzo.jpeg');
});
//POLICIA
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/PoP_Policia_ESFUERZO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/ElEsfuerzo/UPC_ElEsfuerzo.jpeg');
});

//Escuelas
app.get("/gecsurvey/assets/img/DirectorioComunidad/Escuelas/ESFUERZO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Escuelas/ElEsfuerzo/EscuelaElEsfuerzo.png');
});

//Popup Escuelas
app.get("/gecsurvey/assets/img/DirectorioComunidad/Escuelas/LUZA/FOTO_ESFUERZO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Escuelas/ElEsfuerzo/PopUp_ElEsfuerzo.jpg');
});


//  ---------------------------------------------------- PUERTO LIMON ---------------------------------------------------------------------
// GAB PUERTO LIMON
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/GAD_PUERTO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/PtoLimon/GadPuertoLimon.png');
});

//MinisterioDeSaludPublica
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/MSP_PUERTO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/MinisterioDeSaludPublica.jpg');
});
//Bomberos
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/Bomberos_PUERTO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/Bomberos.jpg');
});

//Popup Organismos
//GAD
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/GAD/GAD_PUERTO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/PtoLimon/GadPuertoLimon_PopU.png');
});
//MPS
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/MSP/MSP_PUERTO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/PtoLimon/MSP_PtoLimon_POPUP.png');
});
//BOMBEROS
app.get("/gecsurvey/assets/img/DirectorioComunidad/Organismos/Bomberos/BOMBEROS_PUERTO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Organismos/PtoLimon/CuerpoBomberos_PuertoLimon.jpeg');
});

//Escuelas
app.get("/gecsurvey/assets/img/DirectorioComunidad/Escuelas/PUERTO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Escuelas/PuertoLimon/EscuelaPuertoLimon.png');
});

//Popup Escuelas
app.get("/gecsurvey/assets/img/DirectorioComunidad/Escuelas/LUZA/FOTO_PUERTO",(req,res) => {
    res.sendFile(__dirname +'/GecSurvey_srv/public/assets/img/DirectorioComunidad/Escuelas/PuertoLimon/PopUp_PuertoLimon.png');
});

//=======================================================================================================
//SEGURIDAD ESPE

/*

import AUTH  from "./seguridad-espe-tesis/routes/auth.js";
import  USUARIOS from "./seguridad-espe-tesis/routes/usuarios.js";
import MENSAJES from "./seguridad-espe-tesis/routes/mensajes.js";
import SALAS from "./seguridad-espe-tesis/routes/salas.js";
import PBLIC from "./seguridad-espe-tesis/routes/publicaciones.js";
import  COM from "./seguridad-espe-tesis/routes/comentarios.js";
import UPLS from "./seguridad-espe-tesis/routes/uploads.js";
import BUSCAR from "./seguridad-espe-tesis/routes/buscar.js";
import UBICAIONALL from "./seguridad-espe-tesis/routes/ubicaciones.js";
import REPORTM from "./seguridad-espe-tesis/routes/reportes.js";
import NOTIFICACION from "./seguridad-espe-tesis/routes/notificaciones.js";
import DENUNCIAS from "./seguridad-espe-tesis/routes/denuncias.js";
import EMAILESPES  from "./seguridad-espe-tesis/routes/email.js";
import DOCUMENTOS  from "./seguridad-espe-tesis/routes/documents.js";
app.use("/api/comentarios", COM);
app.use("/api/login", AUTH);
app.use("/api/mensajes", MENSAJES);
app.use("/api/publicacion", PBLIC);
app.use("/api/salas", SALAS);
app.use("/api/uploads", UPLS);
app.use("/api/usuarios", USUARIOS);
app.use("/api/buscar", BUSCAR);
app.use("/api/ubicaciones", UBICAIONALL);
app.use("/api/reportes", REPORTM);
app.use("/api/notificacion", NOTIFICACION);
app.use("/api/denuncias", DENUNCIAS);
app.use("/api/email", EMAILESPES);
app.use("/api/documents", DOCUMENTOS);

*/
//=======================================================================================================
//SEGURIDAD ESPE VINCULACION

import AUTH_v2  from "./seguridad-espe-vinculacion/routes/auth.js";
import  USUARIOS_v2 from "./seguridad-espe-vinculacion/routes/usuarios.js";
import MENSAJES_v2 from "./seguridad-espe-vinculacion/routes/mensajes.js";
import SALAS_v2 from "./seguridad-espe-vinculacion/routes/salas.js";
import PBLIC_v2 from "./seguridad-espe-vinculacion/routes/publicaciones.js";
import  COM_v2 from "./seguridad-espe-vinculacion/routes/comentarios.js";
import UPLS_v2 from "./seguridad-espe-vinculacion/routes/uploads.js";
import BUSCAR_v2 from "./seguridad-espe-vinculacion/routes/buscar.js";
import UBICAIONALL_v2 from "./seguridad-espe-vinculacion/routes/ubicaciones.js";
import REPORTM_v2 from "./seguridad-espe-vinculacion/routes/reportes.js";
import NOTIFICACION_v2 from "./seguridad-espe-vinculacion/routes/notificaciones.js";
import DENUNCIAS_v2 from "./seguridad-espe-vinculacion/routes/denuncias.js";
import EMAILESPES_v2  from "./seguridad-espe-vinculacion/routes/email.js";
import DOCUMENTOS_v2  from "./seguridad-espe-vinculacion/routes/documents.js";
import INSTITUCION_v2  from "./seguridad-espe-vinculacion/routes/instituciones.js";
app.use("/api/v2/comentarios", COM_v2);
app.use("/api/v2/login", AUTH_v2);
app.use("/api/v2/mensajes", MENSAJES_v2);
app.use("/api/v2/publicacion", PBLIC_v2);
app.use("/api/v2/salas", SALAS_v2);
app.use("/api/v2/uploads", UPLS_v2);
app.use("/api/v2/usuarios", USUARIOS_v2);
app.use("/api/v2/buscar", BUSCAR_v2);
app.use("/api/v2/ubicaciones", UBICAIONALL_v2);
app.use("/api/v2/reportes", REPORTM_v2);
app.use("/api/v2/notificacion", NOTIFICACION_v2);
app.use("/api/v2/denuncias", DENUNCIAS_v2);
app.use("/api/v2/email", EMAILESPES_v2);
app.use("/api/v2/documents", DOCUMENTOS_v2);
app.use("/api/v2/instituciones", INSTITUCION_v2);
