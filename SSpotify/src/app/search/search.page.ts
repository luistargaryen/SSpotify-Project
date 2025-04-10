import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongSearchService } from '../services/song-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true
})
export class SearchPage implements OnInit {
  songSearchService = inject(SongSearchService);
  public genres = Array<string>();

  constructor(private router: Router) {}

  colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];

  async ngOnInit() {
    try {
      const response = await this.songSearchService.getGenres();
      console.log(response);
      this.genres = response;
    } catch (error) {
      console.error(error);
    }
  }

  async search(name: string) {
    this.router.navigate(['/searchSong', name]);
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.search(query);
  }

  getRandomColor(genre: string) {
    const genreIndex = this.genres.indexOf(genre);
    if (genreIndex === -1) {
      return 'default'; // Retorna un color predeterminado si el género no se encuentra
    }
    const colorIndex = genreIndex % this.colors.length;
    return this.colors[colorIndex];
  }

  redirectToGenre(genre: string) {
    this.router.navigate(['/songGenre', genre]);
  }
}
