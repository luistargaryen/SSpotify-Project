import User from '../../models/User.js'; 

export const modify = async (req, res) => {
  try {
    const { bio, website, location } = req.body;
    if (!req.user.id) return res.status(401).json({ msg: 'No autorizado' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    user.profile.bio = bio;
    user.profile.website = website;
    user.profile.location = location;
    await user.save();

    res.json({ msg: 'Perfil modificado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};