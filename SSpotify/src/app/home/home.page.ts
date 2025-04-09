import { Component, OnInit, inject } from '@angular/core';
import { ItemCardComponent } from '../components/item-card/item-card.component';
import { ItemArtistComponent } from '../components/item-artist/item-artist.component';
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongSearchService } from '../services/song-search.service';
import  songMocks  from '../../mocks/music.json';
import  artistMocks  from '../../mocks/artist.json';
import  albumMocks  from '../../mocks/album.json';
import { LoadingController, ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, 
    CommonModule,
    FormsModule,
    ItemCardComponent,
    ItemArtistComponent,
    HttpClientModule,
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  songSearchService = inject(SongSearchService);

  constructor() {}

  public songs: any[] = songMocks;
  public artists: any[] = artistMocks;
  public albums: any[] = albumMocks;
  async ngOnInit() {
    try {
      const responseSongs = await this.songSearchService.getTopSongs();
      const responseArtists = await this.songSearchService.getTopArtist();
      const responseAlbums = await this.songSearchService.getNewAlbums();

      this.songs = responseSongs;
      this.artists = responseArtists;
      this.albums = responseAlbums;
    } catch (error) {
      console.error(error);
    }
  }

}
