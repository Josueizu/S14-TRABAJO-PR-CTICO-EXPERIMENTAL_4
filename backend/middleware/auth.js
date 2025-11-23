const jwt = require('jsonwebtoken');

exports.protegerRuta = async (req, res, next) => {
  try {
    let token;

    // Verificar si el token está en los headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No autorizado, token no proporcionado'
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'No autorizado, token inválido'
    });
  }
};