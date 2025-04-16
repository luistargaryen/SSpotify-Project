import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SongSearchService } from 'src/app/services/song-search.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { PlayButtomComponent } from 'src/app/components/play-buttom/play-buttom.component';
import { MusicPlayerService } from 'src/app/services/music-player.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const BASE_IMAGE_LIKES = 'https://img.freepik.com/premium-photo/black-minimalist-wallpaper_889056-13077.jpg';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LikesPage implements OnInit {
  public imageBase = BASE_IMAGE_LIKES;

  constructor(
    private songSearchService: SongSearchService,
    private router: Router,
    private musicPlayerService: MusicPlayerService,
    private sharedDataService: SharedDataService
  ) {
    addIcons({ addCircleOutline });
  }

  public songs: any = [];  

  async ngOnInit() {
    try {
      const response = await this.songSearchService.getAllLikes();
      this.songs = response;
      console.log('response', response);
    } catch (error) {
      console.error(error);
      this.router.navigate(['/tabs']);
    }    
  }

  async goToSong(idSong: string) {
    this.router.navigate([`/song`, idSong]);
  }  

  async playLikes() {
    this.musicPlayerService.setPlaylist(this.songs);
    this.sharedDataService.changeUrlSong(this.songs[0].urlSong);
    this.musicPlayerService.play(this.songs[0].urlSong);
    this.sharedDataService.changeArtistsOut(this.songs[0].artistName);
    this.sharedDataService.changeSongName(this.songs[0].name);
    this.sharedDataService.changeTrackPhoto(this.songs[0].urlImage);
  }

}
