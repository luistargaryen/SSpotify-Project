import Artist from '../../models/Artist.js';

export const createArtist = async (req, res) => {
    try {
        const { name, genre, image, popularity } = req.body;
        const newArtist = new Artist({
            name,
            genre,
            image,
            popularity,
        });

        // Guardar el nuevo artista en la base de datos
        const savedArtist = await newArtist.save();
        res.status(201).json({
            message: 'Artista creado correctamente',
            artist: savedArtist,
        });
    } catch (error) {
        console.error(error);
        if (error instanceof mongoose.Error) {
            res.status(400).json({
                message: 'Error al crear el artista',
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