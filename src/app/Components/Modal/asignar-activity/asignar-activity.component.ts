import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Activity } from 'src/app/Models/activity';
import { ModalMessageComponent } from '../modal-message/modal-message.component';

@Component({
  selector: 'app-asignar-activity',
  templateUrl: './asignar-activity.component.html',
  styleUrls: ['./asignar-activity.component.css']
})
export class AsignarActivityComponent implements OnInit {

  @ViewChild(ModalMessageComponent, {static: false}) messageModal!: ModalMessageComponent;
  @Output() eventAsignado = new EventEmitter<Boolean>();

  public active: Boolean;
  public actividad!:Activity;

  constructor() {
    this.active = false;
  }

  ngOnInit() {
    this.actividad = new Activity();
  }

  ocultar() {
    this.active = false;
  }

  mostrar(activity:Activity) {
    this.actividad = activity;
    console.log(this.actividad.nameActivity);
    this.active = true;
  }

  asignado(event:any){
    this.messageModal.mostrar(event);
    this.eventAsignado.emit(true);
  }

}
