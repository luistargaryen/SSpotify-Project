import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SongSearchService } from 'src/app/services/song-search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ArtistPage implements OnInit {
  songSearchService = inject(SongSearchService);
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.idArtist = this.activatedRoute.snapshot.paramMap.get('idArtist') || '';    
  }

  idArtist: string = '';
  @Input() name = '';
  @Input() genres = [];
  followers: number = 0;
  @Input() urlImage = '';
  @Input() songs: songType[] = [
    {
      urlImage: '',
      name: '',
      id: '',
    },
  ];

  @Input() albums: albumType[] = [
    {
      urlImage: '',
      name: '',
      id: '',
    },
  ];

  

  async ngOnInit() {
    try {
      const response = await this.songSearchService.getArtistInfo(
        this.idArtist
      );

      this.name = response.name;
      this.followers = response.followers.total;
      this.genres = response.genres;
      this.urlImage = response.images[0].url;
      this.idArtist = response.id;

      const response2 = await this.songSearchService.getArtistAlbums(
        this.idArtist
      );

      this.albums = response2;

      const tracksForOneAlbum = response2[0].songs.map((song: any) => {
        const newObject = {
          urlImage: response2[0].urlImage,
          id: song.id,
          name: song.name,
          date: song.release_date || Date.now(),
        };

        return newObject;
      });

      this.songs = tracksForOneAlbum;
    } catch (error) {
      this.router.navigate(['/tabs']);
    }
  }

  goToSong(idSong: string) {
    this.router.navigate(['/song', idSong]);
  }

  goToAlbum(idAlbum: string) {
    this.router.navigate(['/album', idAlbum]);
  }
}

interface songType {
  urlImage: string;
  name: string;
  id: string;
}

interface albumType {
  urlImage: string;
  name: string;
  id: string;
}
