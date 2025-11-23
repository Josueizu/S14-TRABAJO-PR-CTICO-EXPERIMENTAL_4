 const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario'
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // Permite valores null sin conflicto de unique
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Índices para mejorar búsquedas
usuarioSchema.index({ email: 1 });
usuarioSchema.index({ googleId: 1 });

// Método para ocultar password al convertir a JSON
usuarioSchema.methods.toJSON = function() {
  const usuario = this.toObject();
  delete usuario.password;
  return usuario;
};

module.exports = mongoose.model('Usuario', usuarioSchema);