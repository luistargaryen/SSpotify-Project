export interface Artist {
    _id?: string; 
    name: string;
    genres?: string[]; 
    image?: string;
    popularity: number;
}