import { Artist } from '../models/artist.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinArtists',
  standalone: true
})

export class JoinArtistsService implements PipeTransform {
  transform(artists: Artist[]): string { 
    return artists.map(artist => artist.name).join(', ');
  }
}
