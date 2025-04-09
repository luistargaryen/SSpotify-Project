export interface UserProfile {
    bio?: string;
    website?: string;
    location?: string;
}

export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string; 
    profile?: UserProfile;
    idRol: string;
    idArtist?: string;
}