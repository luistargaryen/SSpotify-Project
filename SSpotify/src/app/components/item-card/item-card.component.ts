import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true
})
export class ItemCardComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  @Input() songName: string = 'cancion';
  @Input() artistName: string[] = [];
  @Input() urlImage: string =
  'https://ionicframework.com/docs/img/demos/card-media.png';
  @Input() idSong: string = 'id';
  @Input() redirectTo?: string = '';

  public goToRoute() {
    this.router.navigate([`${this.redirectTo}/${this.idSong}`]);
  }
}
