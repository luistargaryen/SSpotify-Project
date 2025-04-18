import User from '../../models/User.js'; 

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



