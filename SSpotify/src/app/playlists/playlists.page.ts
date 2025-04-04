import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-playlists',
  templateUrl: 'playlists.page.html',
  styleUrls: ['playlists.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ],
})
export class PlaylistsPage {
  constructor() {}
}
