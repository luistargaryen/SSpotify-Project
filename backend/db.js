import { configDotenv } from "dotenv";

import mongoose from "mongoose";

configDotenv();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, // Aumenta el tiempo de espera a 30 segundos por si acaso 
        serverSelectionTimeoutMS: 30000 

      });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1);
  }
};

