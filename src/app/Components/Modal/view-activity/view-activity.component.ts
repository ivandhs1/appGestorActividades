import { Activity } from './../../../Models/activity';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent implements OnInit {

  @ViewChild(EditActivityComponent, {static: false}) modalEdit!: EditActivityComponent;
  
  public active: Boolean;
  public actividad!:Activity;
  public ActsForm!:FormGroup;

  constructor(private fb: FormBuilder) {
    this.active = false;
  }

  ngOnInit() {
    this.crearFormulario();
  }

  ocultar() {
    this.active = false;
  }

  mostrar(activity:Activity) {
    this.actividad = activity;
    this.cargarForm();
    this.active = true;
  }

  mostrarSecond() {
    this.active = true;
  }

  cargarForm(){
    this.ActsForm.get('nombre')?.patchValue(this.actividad.nameActivity)
    this.ActsForm.get('descripcion')?.patchValue(this.actividad.descActivity)
  }

  editActivity(activity: Activity){
    this.ocultar();
    this.modalEdit.mostrar(activity);
  }

  isEvent(){
    this.mostrarSecond();
  }


  get nombreControl(): FormControl{
    return this.ActsForm.get('nombre') as FormControl
  }

  get descripcionControl(): FormControl{
    return this.ActsForm.get('descripcion') as FormControl
  }

  crearFormulario() {
    this.ActsForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
  }
}
