import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/Models/activity';
import { FormEditComponent } from '../../SubComponents/form-edit/form-edit.component';
import { ModalMessageComponent } from '../modal-message/modal-message.component';
import { DbActivitys } from 'src/app/Services/db-activitys.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  @Output() isEvent = new EventEmitter<Boolean>();

  @ViewChild(FormEditComponent, {static:false}) formEdit !: FormEditComponent;
  @ViewChild(ModalMessageComponent, {static: false}) messageModal!: ModalMessageComponent;

  public active: Boolean;
  public actividad!:Activity;

  constructor(private serviceDB : DbActivitys) {
    this.active = false;
  }

  ngOnInit() {}

  guardar(){
    let updateActivity: Activity = this.formEdit.guardarDatos();
    
    this.serviceDB.updateAct(updateActivity._id, updateActivity).subscribe((res:any) =>{
      let message: string = "Se ha actualizado correctamente la actividad."
      this.messageModal.mostrar(message)
      this.ocultar()
      this.isEvent.emit(true);
    })
  }

  ocultar() {
    this.active = false;
  }

  mostrar(activity:Activity) {
    this.actividad = activity;
    this.active = true;
  }

  mostrarSecond() {
    this.active = true;
  }




}
