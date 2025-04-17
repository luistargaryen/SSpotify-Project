import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UploadService } from 'src/app/services/upload.service';
import { SongSearchService } from 'src/app/services/song-search.service';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UploadPage implements OnInit {
  private BASE_URL_IMAGE_DEFAULT =
  'https://st.depositphotos.com/1605581/2757/i/450/depositphotos_27575223-stock-photo-blue-gradient-background.jpg';

  public selectedFileSong: File | null = null;
  public selectedFileImage: File | null = null;

  public urlSong = '';
  public urlImage = this.BASE_URL_IMAGE_DEFAULT;
  public songName = '';
  public albumName = '';
  public duration = 100;

  constructor(
    public uploadService: UploadService,
    public searchSongService: SongSearchService,
    public router: Router
  ) { }

  ngOnInit() {
    this.songName = 'Rough Music';
    this.albumName = 'Depression Mode';
  }

  onFileSelectedImage(event: any): void {
    this.selectedFileImage = event.target.files[0];

    if (this.selectedFileImage) {
      this.uploadFileImage();
    }
  }

  onFileSelectedSong(event: any): void {
    this.selectedFileSong = event.target.files[0];

    if (this.selectedFileSong) {
      this.calculateDuration(this.selectedFileSong);
      this.uploadFileSong();
    }
  }

  async uploadFileImage(): Promise<void> {
    try {
      alert('Cargando archivo de imagen...');
      if (this.selectedFileImage) {
        try {
          const url = await this.uploadService
            .uploadFile(this.selectedFileImage)
            .toPromise();
          console.log('File uploaded! URL:', url);
          if (!url) throw new Error('Error uploading file');
          this.urlImage = url;
          alert('Archivo de imagen cargado correctamente');
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    } catch (error) {
      alert('Error al cargar el archivo de imagen');
      console.error('Error uploading file:', error);
    }
  }

  async uploadFileSong(): Promise<void> {
    if (this.selectedFileSong) {
      alert('Cargando archivo de canción...');
      console.log('Cargando archivo de canción...');
      try {
        const url = await this.uploadService
          .uploadFile(this.selectedFileSong)
          .toPromise();
        console.log('File uploaded! URL:', url);
        if (!url) throw new Error('Error uploading file');
        this.urlSong = url;
        alert('Archivo de canción cargado correctamente');
      } catch (error) {
        alert('Error al cargar el archivo de canción');
        console.error('Error uploading file:', error);
      }
    }
  }

  calculateDuration(file: File): void {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const reader = new FileReader();

    reader.onload = (e: any) => {
      audioContext.decodeAudioData(e.target.result, (buffer) => {
        const duration = buffer.duration * 1000;

        this.duration = duration;

        console.log('Duration in milliseconds:', duration);
      });
    };

    reader.readAsArrayBuffer(file);
  }

  async uploadSong() {
    if (!this.songName || !this.albumName || !this.urlSong) {
      console.error('Faltan datos por completar');
      alert('Faltan datos por completar');
    }

    try {
      const song = {
        name: this.songName,
        albumName: this.albumName,
        duration: this.duration,
        urlSong: this.urlSong,
        urlImage: this.urlImage,
        date: new Date().toISOString().split('T')[0],
      };

      const result = await this.searchSongService.uploadSong(song);

      alert(`Nombre de la canción: ${this.songName}`);
      if (result?.error) throw new Error(result.error);

      this.router.navigate(['/tabs/home']);
    } catch (error) {
      console.error(error);
    }
  }

}
