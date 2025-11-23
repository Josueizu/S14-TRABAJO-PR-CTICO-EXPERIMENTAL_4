 const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log('═══════════════════════════════════════');
    console.log('✅ MongoDB conectado exitosamente');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
    console.log(`🔌 Puerto: ${conn.connection.port}`);
    console.log('═══════════════════════════════════════');

    // Eventos de conexión
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB desconectado');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Error en MongoDB:', err);
    });

  } catch (error) {
    console.error('═══════════════════════════════════════');
    console.error('❌ Error al conectar MongoDB:');
    console.error(error.message);
    console.error('═══════════════════════════════════════');
    console.error('Verifica que:');
    console.error('1. MongoDB esté corriendo (net start MongoDB)');
    console.error('2. La URL en .env sea correcta');
    console.error('3. El puerto 27017 esté disponible');
    console.error('═══════════════════════════════════════');
    process.exit(1);
  }
};

module.exports = connectDB;