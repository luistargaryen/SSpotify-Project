import { Component, OnInit, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { heartOutline, heartDislikeOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SongSearchService } from 'src/app/services/song-search.service';
import { PlayButtomComponent } from 'src/app/components/play-buttom/play-buttom.component';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Artist } from 'src/app/models/artist.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SongPage implements OnInit {
  songSearchService = inject(SongSearchService);

  public idSong: string = '';
  public name: string = '';
  public duration: number = 0;
  public artists: Array<Artist> = [];
  public album: {
    name: string;
    urlImage: string;
    id: string;
  } = {} as any;
  public date: string = '';
  public urlImage: string = '';
  public urlSong: string = '';
  // public dominantColor: string = '';
  public formattedDuration = '';
  public isLiked: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.idSong = this.activatedRoute.snapshot.paramMap.get('idSong') || '';
    addIcons({ heartOutline, heartDislikeOutline });
  }

  async ngOnInit() {
    try {
      const response = await this.songSearchService.getSong(this.idSong);

      // this.dominantColor = await getDominantColorHex(response.album.urlImage);
      this.idSong = response.id;
      this.name = response.name;
      this.artists = response.artists;
      this.album = response.album;
      this.date = response.date;
      this.urlImage = response.urlImage;
      this.urlSong = response.url_song;
      this.isLiked = response.isLiked;

      this.duration = Number(response.duration_ms) || response.duration;

      const minutes = Math.floor(this.duration / 60000);
      const seconds = Math.floor((this.duration % 60000) / 1000);

      this.formattedDuration = `${minutes}:${
        seconds < 10 ? '0' : ''
      }${seconds}`;
    } catch (error) {
      console.error(error);
      this.router.navigate(['/tabs']);
    }
  }

  async toggleLike() {
    try {
      const result = await this.songSearchService.toggleLike(this.idSong);

      if(result?.message){
        this.isLiked = !this.isLiked;
      }
      this.router.navigate(['/song', this.idSong]);
    } catch (error) {
      console.error(error);
    }
  }

  goToArtist(idArtist: string) {
    this.router.navigate([`/artist/${idArtist}`]);
  }

  updateSharedData() {
    this.sharedDataService.changeUrlSong(this.urlSong);
    this.sharedDataService.changeArtists(this.artists);
    this.sharedDataService.changeSongName(this.name);
    this.sharedDataService.changeTrackPhoto(this.urlImage);
  }

  getGradientStyle(color: string): string {
    return `linear-gradient(to bottom, ${color} -40%, black 40%)`;
  }

  imageSize = 200;

  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.imageSize = Math.max(100, 200 - scrollTop / 5);
  }

}
