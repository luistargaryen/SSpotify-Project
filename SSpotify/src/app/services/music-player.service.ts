import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  public audio = new Audio();
  private isPlaying = false;
  private playStatus = new BehaviorSubject<boolean>(this.isPlaying);
  public playStatus$ = this.playStatus.asObservable();
  private currentTimeSource = new BehaviorSubject<number>(0);
  currentTime$ = this.currentTimeSource.asObservable();
  public durationSource = new BehaviorSubject<number>(0);
  duration$ = this.durationSource.asObservable();
  private songUrlSource = new BehaviorSubject<string | null>(null);
  public songUrl$ = this.songUrlSource.asObservable();
  private tracks: any[] = []; // Replace `any` with your Track model
  private currentTrackIndex = 0;

  private currentTrackSource = new BehaviorSubject<any | null>(null); // Replace `any` with your Track model
  public currentTrack$ = this.currentTrackSource.asObservable();

  constructor(
    private sharedDataService: SharedDataService,
    // private loadingController: LoadingController
  ) {
    this.overrideLocalStorageMethods();
    this.listenForTokenRemoval();
  }

  async setPlaylist(tracks: any[]) {
    this.tracks = tracks;
    console.log('Setting Playlist:', this.tracks); // Debugging line
    this.currentTrackIndex = 0; // Optionally, start playing the first track
    this.updateCurrentTrack();
  }

  private updateCurrentTrack(): void {
    const currentTrack = this.tracks[this.currentTrackIndex];
    console.log('Updating Current Track:', currentTrack); // Debugging line
    this.currentTrackSource.next(currentTrack);
  }

  async play(url: string) {
    this.songUrlSource.next(url);

    if (this.audio.src === url) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  
    this.audio.src = url;
    // await this.presentLoading();
    try {
      await this.loadAudio(); 
      // await this.dismissLoading();
      await this.startPlayback(); // Inicia la reproducción
    } catch (error) {
      console.error("Error during audio playback:", error);
      // await this.dismissLoading();
    }
  }

  private async loadAudio() {
    return new Promise((resolve, reject) => {
      this.audio.load();
      this.audio.onloadedmetadata = () => {
        this.durationSource.next(this.audio.duration);
        // console.log(this.audio.duration);
        resolve(true);
      };
      this.audio.onerror = reject;
      this.audio.ontimeupdate = () => {
        this.currentTimeSource.next(this.audio.currentTime);
      };
    });
  }

  private async startPlayback() {
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.playStatus.next(this.isPlaying);
    } catch (error) {
      throw error;
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.playStatus.next(this.isPlaying);
  }

  resume() {
    if (!this.isPlaying && this.audio.src) {
      this.audio.play();
      this.isPlaying = true;
      this.playStatus.next(this.isPlaying);
    }
  }

  private playCurrentTrack(): void {
    const currentTrack = this.tracks[this.currentTrackIndex];
    if(currentTrack.url_song){
      this.play(currentTrack.url_song); // Assuming eatrack has a [`url`
      
    }else{
      this.play(currentTrack.urlSong)
      console.log('current artists', currentTrack.artistNames)
      if(currentTrack.artistNames){
        this.sharedDataService.changeArtistsOut(currentTrack.artistNames);
      }else{
        this.sharedDataService.changeArtists(currentTrack.artists)
      }
      this.sharedDataService.changeSongName(currentTrack.name);
      this.sharedDataService.changeTrackPhoto(currentTrack.urlImage);
    }
  }
  playNext(): void {
    if (this.currentTrackIndex < this.tracks.length - 1) {
      this.currentTrackIndex++;
      this.updateCurrentTrack();
      this.playCurrentTrack();
    }
  }

  playPrevious(): void {
    if (this.currentTrackIndex > 0) {
      this.currentTrackIndex--;
      this.updateCurrentTrack();
      this.playCurrentTrack();
    }
  }

  getNextTrack() {
    const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    return this.tracks[nextIndex];
  }

  resetPlayer() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = '';
    this.isPlaying = false;
    this.playStatus.next(this.isPlaying);
    this.currentTimeSource.next(0);
    this.durationSource.next(0);
    this.songUrlSource.next(null);
    this.currentTrackSource.next(null);
    this.tracks = [];
    this.currentTrackIndex = 0;
  }

  private overrideLocalStorageMethods() {
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;

    localStorage.setItem = function(key, value) {
      const event = new Event('storageChange') as any;
      event['key'] = key;
      event['newValue'] = value;
      window.dispatchEvent(event);
      originalSetItem.apply(this, arguments as any);
    };

    localStorage.removeItem = function(key) {
      const event = new Event('storageChange') as any;
      event['key'] = key;
      event['newValue'] = null;
      window.dispatchEvent(event);
      originalRemoveItem.apply(this, arguments as any);
    };
  }

  private listenForTokenRemoval() {
    window.addEventListener('storageChange', (event: any) => {
      if (event.key === 'token' && event.newValue === null) {
        this.resetPlayer();
      }
    });
  }
}
