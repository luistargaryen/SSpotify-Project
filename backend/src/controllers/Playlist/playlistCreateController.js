// Importar el modelo Playlist
import Playlist from '../../models/Playlist.js';

export const createPlaylist = async (req, res) => {
    try {
        const { idPlaylist, name, image, idSong } = req.body;
        // Validar que todos los campos requeridos estén presentes
        if (!idPlaylist ||!name ||!image ||!idSong) {
            return res.status(400).json({ message: 'Faltan datos necesarios para crear la playlist.' });
        }
        const playlist = new Playlist({
            idPlaylist,
            name,
            image,
            idSong,
        });

        // Guardar la nueva playlist en la base de datos
        const savedPlaylist = await playlist.save();
        res.status(201).json({
            message: 'Playlist creada correctamente',
            playlist: savedPlaylist,
        });
    } catch (error) {
        console.error(error);
        if (error instanceof mongoose.Error) {
            res.status(400).json({
                message: 'Error al crear la playlist',
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Error interno del servidor',
                error: error.message,
            });
        }
    }
};