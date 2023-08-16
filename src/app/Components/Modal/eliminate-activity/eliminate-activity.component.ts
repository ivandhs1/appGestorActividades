import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalAlertComponent } from '../modal-alert/modal-alert.component';
import { DbActivitys } from 'src/app/Services/db-activitys.service';
import { ModalMessageComponent } from '../modal-message/modal-message.component';

@Component({
  selector: 'app-eliminate-activity',
  templateUrl: './eliminate-activity.component.html',
  styleUrls: ['./eliminate-activity.component.css']
})
export class EliminateActivityComponent implements OnInit {

  @Output() isEvent = new EventEmitter<Boolean>();

  @ViewChild(ModalAlertComponent, {static: false}) modalAlert!: ModalAlertComponent;
  @ViewChild(ModalMessageComponent, {static: false}) modalMessage!: ModalMessageComponent;

  public active: Boolean;
  public nameActivityModal:string;
  public idActivityModal:string;

  constructor(private serviceDB: DbActivitys) {
    this.active = false;
    this.nameActivityModal = "";
    this.idActivityModal = "";
  }

  ngOnInit() {}

  ocultar() {
    this.active = false;
  }

  mostrar(idActivity: string, nameActivity: string) {
    this.idActivityModal = idActivity;
    this.nameActivityModal = nameActivity;
    this.active = true;
  }

  confirmar($event: Boolean){
    if($event==true){
      this.modalAlert.ocultar();
      this.serviceDB.eliminateAct(this.idActivityModal).subscribe((res:any) => {
        this.modalMessage.mostrar("Se ha eliminado la actividad correctamente!!")
        this.isEvent.emit(true);
        this.ocultar();
      })
    }
  }

  delete(){
    this.modalAlert.mostrar("Esta seguro de borrar esta actividad.");
  }
}
