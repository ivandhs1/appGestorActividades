import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Activity } from 'src/app/Models/activity';
import { DbUsersService } from 'src/app/Services/db-users.service';
import { User } from 'src/app/Models/user';
import { DbActivitys } from 'src/app/Services/db-activitys.service';

@Component({
  selector: 'app-form-asignar',
  templateUrl: './form-asignar.component.html',
  styleUrls: ['./form-asignar.component.css']
})
export class FormAsignarComponent implements OnInit, OnChanges {

  @Input() actividadCarg!: Activity;
  @Output() eventAsignado = new EventEmitter<string>();
  public actividad!: Activity;
  public users!: User[];

  public asignateActsForm!:FormGroup;

  constructor(private fb: FormBuilder, private serviceDBUsers: DbUsersService, private serviceDBActivitys: DbActivitys) {
  }

  ngOnInit(): void {
    this.serviceDBUsers.obtenerUsers().subscribe((res:any) => {
      this.users = res;
    })
    this.crearFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['actividadCarg'].currentValue!=undefined){
      this.actividad = this.actividadCarg;
    }
  }

  asignateUser(){
    let user: string = this.asignateActsForm.get('usuario')?.value;
    let idActivity: string = this.actividadCarg._id;

    if(user.length != 0){
      this.serviceDBActivitys.asignateUser(user, idActivity).subscribe((res:any) =>{
        this.eventAsignado.emit(res.message);
      })
    }
  }

  crearFormulario() {
    this.asignateActsForm = this.fb.group({
      usuario: ['', []]
    })
  }

}
