import User from '../../models/User.js'; 

export const remove = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        await user.deleteOne();
        res.json({ msg: 'Cuenta eliminada' });
      } catch (error) {
        console.error(error); 
        res.status(500).json({ msg: 'Error interno del servidor' });
      }
    };