import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-item-artist',
  templateUrl: './item-artist.component.html',
  styleUrls: ['./item-artist.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ItemArtistComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  @Input() idArtist: string = ""
  @Input() artistName: string = 'artista';
  @Input() urlImage: string = 'https://via.placeholder.com/150';
  @Input() redirectTo?: string = '';

  public goToRoute(){
    this.router.navigate([`${this.redirectTo}/${this.idArtist}`])
  }
}
