import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css']
})
export class ModalAlertComponent implements OnInit {

  @Output() isEvent = new EventEmitter<Boolean>();

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

  confirmar(){
    this.isEvent.emit(true);
  }
}
