 const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// ==================== CREATE ====================
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Validar campos requeridos
    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Nombre, email y contraseña son requeridos'
      });
    }

    // Verificar si el email ya existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        error: 'El email ya está registrado'
      });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear usuario
    const usuario = await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      rol: rol || 'usuario'
    });

    console.log('✅ Usuario creado:', email);

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: usuario
    });

  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Error al crear usuario'
    });
  }
};

// ==================== READ ALL ====================
exports.obtenerUsuarios = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', rol } = req.query;

    // Construir filtro de búsqueda
    const filtro = {};
    
    if (search) {
      filtro.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (rol) {
      filtro.rol = rol;
    }

    // Calcular paginación
    const skip = (page - 1) * limit;

    // Obtener usuarios
    const usuarios = await Usuario.find(filtro)
      .select('-password')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    // Contar total
    const total = await Usuario.countDocuments(filtro);

    console.log(`📋 Listando ${usuarios.length} usuarios (total: ${total})`);

    res.json({
      success: true,
      count: usuarios.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: usuarios
    });

  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error al obtener usuarios'
    });
  }
};

// ==================== READ ONE ====================
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    console.log('🔍 Usuario encontrado:', usuario.email);

    res.json({
      success: true,
      data: usuario
    });

  } catch (error) {
    console.error('❌ Error al obtener usuario:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'ID de usuario inválido'
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Error al obtener usuario'
    });
  }
};

// ==================== UPDATE ====================
exports.actualizarUsuario = async (req, res) => {
  try {
    const { password, ...datosActualizar } = req.body;

    // Si se envía password, encriptarlo
    if (password) {
      const salt = await bcrypt.genSalt(10);
      datosActualizar.password = await bcrypt.hash(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      datosActualizar,
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password');
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    console.log('✏️  Usuario actualizado:', usuario.email);

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: usuario
    });

  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'ID de usuario inválido'
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'El email ya está en uso'
      });
    }

    res.status(400).json({
      success: false,
      error: error.message || 'Error al actualizar usuario'
    });
  }
};

// ==================== DELETE ====================
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    console.log('🗑️  Usuario eliminado:', usuario.email);

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente',
      data: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'ID de usuario inválido'
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Error al eliminar usuario'
    });
  }
};