import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,]
})
export class SearchPage {

  constructor() {}

}
