import Playlist from '../../models/Playlist.js';


export const modifyPlaylist = async (req, res) => {
    try {
        const { idPlaylist, name, image, idSong } = req.body;
        const playlist = await Playlist.findById(idPlaylist);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist no encontrada' });
        }
        playlist.name = name;
        playlist.image = image;
        playlist.idSong = idSong;
        const savedPlaylist = await playlist.save();
        res.status(200).json({ message: 'Playlist modificada correctamente', playlist: savedPlaylist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
