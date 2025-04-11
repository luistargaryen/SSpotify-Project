import { Component, OnInit, Input } from '@angular/core';
import { play, pause, caretForwardOutline, caretBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { JoinArtistsService } from '../../services/join-artists.service';
import { MusicPlayerService } from '../../services/music-player.service';
import { CommonModule } from '@angular/common';
import { PlayButtomComponent } from '../play-buttom/play-buttom.component';
import { SharedDataService } from '../../services/shared-data.service';
import { FormsModule } from '@angular/forms';
import {ModalController} from '@ionic/angular';
import { IonicModule} from '@ionic/angular';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, JoinArtistsService],
})
export class MusicPlayerComponent  implements OnInit {
  songUrl: string = '';
  isPlaying: boolean = false;
  public idSong: string = '';
  public name: string = '';
  public duration: number = 0;
  public artists: Array<Artist> = [];
  public artistsOut: Array<any> = [];
  public album: {
    name: string;
    urlImage: string;
    id: string;
  } = {} as any;
  public date: string = '';
  public urlImage: string = '';
  public urlSong: string = '';
  public dominantColor: string = '';
  public formattedDuration = '';
  public currentAudioPosition = 0;
  showArtistsOut: boolean = false;
  currentTrack: any;
  isAlbum: boolean; 
  currentSong: { name: string };

  nextTrack: { name: string };


  constructor(
    private musicPlayerService: MusicPlayerService,
    private sharedDataService: SharedDataService,
    public modalController: ModalController
  ) {
    addIcons({ play, pause, caretForwardOutline, caretBackOutline });
    this.nextTrack = { name: '' };
    this.isAlbum = false; // Initialize this property
    this.currentSong = { name: '' }; // Initialize this property
    this.currentTrack = { name: '' }; // Initialize this property
    
  }

  isShow() {
    return (
      this.songUrl != null && this.songUrl != '' && this.songUrl != undefined
    );
  }

  ngOnInit() {

    this.checkTokenAndReset();

    window.addEventListener('storage', (event) => {
      if (event.key === 'token' && event.newValue === null) {
        this.resetPlayer();
      }
    });

    this.nextTrack = this.musicPlayerService.getNextTrack();
    this.musicPlayerService.songUrl$.subscribe((url) => {
      if (!url || url === null) return;
      
      this.songUrl = url;
      const audio = this.musicPlayerService.audio;
      audio.addEventListener('timeupdate', this.updateProgressBar, false);
      audio.addEventListener('timeupdate', this.updateProgressBarModal, false);
      audio.addEventListener('ended', this.checkProgressBar, false);
    });
    this.musicPlayerService.playStatus$.subscribe((status) => {
      this.isPlaying = status;
    });
    this.sharedDataService.currentUrlSong.subscribe(
      (url) => (this.urlSong = url)
    );
    this.sharedDataService.currentArtists.subscribe(
      (artists) => (this.artists = artists,
        this.showArtistsOut = false,
        this.isAlbum = true
      )
    );
    this.sharedDataService.currentArtistsOut.subscribe(
      (artistsOut) => (this.artistsOut = artistsOut,
        this.showArtistsOut = true
      )
    );
    this.sharedDataService.currentSongName.subscribe(
      (name) => (this.name = name,
        this.isAlbum = false
      )
    );
    this.sharedDataService.currentTrackPhoto.subscribe(
      (photo) => (this.urlImage = photo)
    );
    this.musicPlayerService.currentTrack$.subscribe(track => {
      this.currentTrack = track;
      this.nextTrack = this.musicPlayerService.getNextTrack();
      console.log('Current Track:', this.currentTrack); // Debugging line
      this.isAlbum = true; // Assuming track has an albumIdproperty
      // this.currentSong = track.name; 
    });


  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying && this.urlSong) {
      this.musicPlayerService.resume();
      console.log(this.isAlbum)
      console.log(this.currentTrack)
      console.log(this.artists)
    } else {
      this.musicPlayerService.pause(); // Pause the song
    }
  }

  
  getGradientStyle(color: string): string {
    return `linear-gradient(to bottom, ${color} -40%, black 40%)`;
  }

  pause() {
    this.musicPlayerService.pause();
  }

  isModalOpen = false;
  async OpenModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async CloseModal() {
    this.OpenModal(false);
  }

  updateProgressBar = () => {
    const audio = this.musicPlayerService.audio;
    const progressBar = document.getElementById('audioProgress') as HTMLProgressElement;
    if (progressBar && audio && isFinite(audio.currentTime) && isFinite(audio.duration) && audio.duration > 0) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.value = percentage;
    } else if (progressBar) {
      progressBar.value = 0; // Set to 0 or a sensible default if conditions are not met
    }
  }
  
  updateProgressBarModal = () => {
    const audio = this.musicPlayerService.audio;
    const progressBar = document.getElementById('audioProgressModal') as HTMLProgressElement;
    if (progressBar && audio && isFinite(audio.currentTime) && isFinite(audio.duration) && audio.duration > 0) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.value = percentage;
    } else if (progressBar) {
      progressBar.value = 0; // Set to 0 or a sensible default if conditions are not met
    }
  }

  checkProgressBar = () => {
    const progressBar = document.getElementById('audioProgress') as HTMLProgressElement;
    if (progressBar) {
      progressBar.value == 100;
      this.nextSong();
    }
  }


  nextSong() {
    // Increment the song index or loop back to the start
    this.musicPlayerService.playNext();
  }
  
  previousSong() {
    // Decrement the song index or loop to the end
    this.musicPlayerService.playPrevious();
  }

  checkTokenAndReset() {
    if (!localStorage.getItem('token')) {
      this.resetPlayer();
    }
  }

  resetPlayer() {
    // Reset to initial values
    this.isPlaying = false;
    this.songUrl = '';
    this.idSong = '';
    this.name = '';
    this.duration = 0;
    this.artists = [];
    this.artistsOut = [];
    this.album = {
      name: '',
      urlImage: '',
      id: ''
    };
    this.date = '';
    this.urlImage = '';
    this.urlSong = '';
    this.dominantColor = '';
    this.formattedDuration = '';
    this.currentAudioPosition = 0;
    this.showArtistsOut = false;
    this.currentTrack = '';
    this.isAlbum = false;
    this.nextTrack = { name: '' };
  }

}
