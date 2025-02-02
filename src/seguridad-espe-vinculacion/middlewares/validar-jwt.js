import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
  // Leer token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    console.log(uid);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

export default {
  validarJWT,
};
