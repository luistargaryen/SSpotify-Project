import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayButtomComponent } from '../../components/play-buttom/play-buttom.component';
import { SongSearchService } from 'src/app/services/song-search.service';
import { MusicPlayerService } from 'src/app/services/music-player.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AlbumPage implements OnInit {

  private route = inject(SongSearchService);

  public idAlbum: string = '';
  public name: string = '';
  public urlImage: string = '';
  public date: string = '';
  public totalTracks: number = 0;
  public artists: Array<any> = [];
  public songs: Array<any> = [];
  public dominantColor = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private musicPlayerService: MusicPlayerService, private sharedDataService: SharedDataService) {
    this.idAlbum = this.activatedRoute.snapshot.paramMap.get('idAlbum') || '';    
  }

  async ngOnInit() {
    try {
      const response = await this.route.getAlbumInfo(this.idAlbum);
      this.idAlbum = response.id;
      this.name = response.name;
      this.urlImage = response.urlImage;
      this.date = response.release_date;
      this.totalTracks = response.total_tracks;
      this.artists = response.artists;
      this.songs = response.songs;
    } catch (error) {
      this.router.navigate(['/home']);
    }
  }

  getGradientStyle(color: string): string {
    return `linear-gradient(to bottom, ${color} -40%, black 40%)`;
  }

  goToSong(idSong: string) {
    this.router.navigate(['/song', idSong]);
  }

  goToArtist(idArtist: string) {
    this.router.navigate(['/artist', idArtist]);
  }

  async playAlbum() {
    this.musicPlayerService.setPlaylist(this.songs);
    console.log('Playing Album:', this.songs); // Debugging line
    this.sharedDataService.changeUrlSong(this.songs[0].url_song);
    this.musicPlayerService.play(this.songs[0].url_song);
      this.sharedDataService.changeSongName(this.songs[0].name);
      this.sharedDataService.changeArtists(this.artists);
      this.sharedDataService.changeTrackPhoto(this.urlImage);
  }
}
