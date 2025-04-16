import { inject, OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SongSearchService } from 'src/app/services/song-search.service';
import { PlayButtomComponent } from 'src/app/components/play-buttom/play-buttom.component';
import { MusicPlayerService } from 'src/app/services/music-player.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface PlaylistItemInterface {
  id: string;
  name: string;
  description: string;
  idSongs: Array<string>;
  idUser: string;
  songs: Array<SongInterface>;
}

export const BASE_IMAGE_DEFAULT = "https://img.freepik.com/vector-gratis/gradiente-azul-rosa_78370-260.jpg" 

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.page.html',
  styleUrls: ['./playlist-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlaylistItemPage implements OnInit{
  songSearchService = inject(SongSearchService); 
  public imageBase = BASE_IMAGE_DEFAULT;

  public PlaylistItem: PlaylistItemInterface = {
    id: '',
    name: '',
    description: '',
    idSongs: [],
    idUser: '',
    songs: [],
  };

  
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private musicPlayerService: MusicPlayerService,
    private sharedDataService: SharedDataService,
    // public loadingController: LoadingController,
    // public toastController: ToastController,
    private router: Router
  ) {
    this.PlaylistItem.id =
      this.activatedRoute.snapshot.paramMap.get('idPlaylist') || '';
  }

  async ngOnInit() {
    try {
      // await this.presentLoading();
      const response = await this.songSearchService.getPlaylistById(
        this.PlaylistItem.id
      );
      
      console.log('response of playlist', response);
      this.PlaylistItem = response;
    } catch (error) {
      // this.presentToastSuccess('bottom');
    } finally {
      // await this.dismissLoading();
    }
  }

  goToSong(idSong: string) {
    this.router.navigate([`/song`, idSong]);
  }

  async playPlaylist() {
    this.musicPlayerService.setPlaylist(this.PlaylistItem.songs);
    this.sharedDataService.changeUrlSong(this.PlaylistItem.songs[0].urlSong);
    this.musicPlayerService.play(this.PlaylistItem.songs[0].urlSong);
    this.sharedDataService.changeArtistsOut(this.PlaylistItem.songs[0].artistNames);
    this.sharedDataService.changeSongName(this.PlaylistItem.songs[0].name);
    this.sharedDataService.changeTrackPhoto(this.PlaylistItem.songs[0].urlImage);
  }

}
