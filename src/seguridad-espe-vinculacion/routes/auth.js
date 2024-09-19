/*
    path: api/login
    TOUTER
*/
import { Router } from 'express';
import { check } from 'express-validator';

import { crearUsuario, login, renewToken, googleAuth,olvidoPassword } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();



router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
], crearUsuario );

router.post('/', [
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
], login );


router.get('/renew', validarJWT, renewToken );


router.post('/google', googleAuth );    

router.post("/olvido-password", olvidoPassword);

export default router;
