import User from '../../models/User.js';
import { configDotenv } from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Rol from '../../models/Rol.js';


configDotenv();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciales incorrectas' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales incorrectas' });
    const role = await Rol.findOne({ idRol: user.idRol });
    if (!role) return res.status(404).json({ msg: 'Rol no encontrado' });

    const roleDescription = role? role.description : 'Rol no asignado';

    const token = jwt.sign(
      { id: user._id, roleDescription }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    const userId = user._id.toString();

    res.json({
      msg: 'Has iniciado sesión correctamente',
      token,
      roleDescription,
      userId, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error interno del servidor' });
  };
};