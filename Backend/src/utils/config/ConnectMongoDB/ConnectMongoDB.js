import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
    process.exit(1); // Cierra el proceso si no se conecta
  }
};

export default connectDB;
