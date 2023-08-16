import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit {

  public active: Boolean;
  public message: string = "";

  constructor() {
    this.active = false;
  }

  ngOnInit() {}

  ocultar() {
    this.active = false;
  }

  mostrar(message: string) {
    this.active = true;
    this.message = message;
  }

}
