import { Activity } from 'src/app/Models/activity';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormCreateComponent } from '../../SubComponents/form-create/form-create.component';
import { DbActivitys } from 'src/app/Services/db-activitys.service';
import { ModalMessageComponent } from '../modal-message/modal-message.component';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  @ViewChild(FormCreateComponent, {static: false}) formCreate!: FormCreateComponent;
  @ViewChild(ModalMessageComponent, {static: false}) messageModal!: ModalMessageComponent;

  public active: Boolean;

  @Output() eventCreado = new EventEmitter<string>();

  constructor(private serviceDB: DbActivitys) {
    this.active = false;
  }

  ngOnInit() {}

  ocultar() {
    this.active = false;
  }

  mostrar() {
    this.active = true;
  }

  guardar(){
    let newActivity: any = this.formCreate.guardarDatos();
    
    this.serviceDB.crearAct(newActivity).subscribe((res:any) => {
      let message: string = "Se ha creado correctamente la actividad."
      this.messageModal.mostrar(message)
      this.ocultar()
      this.eventCreado.emit(res.activity);
    })
    
  }

}
