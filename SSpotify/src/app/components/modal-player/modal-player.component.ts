import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-player',
  templateUrl: './modal-player.component.html',
  styleUrls: ['./modal-player.component.scss'],
})
export class ModalPlayerComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  } 

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
  cancel() {
    this.setOpen(false);
  } 
}
