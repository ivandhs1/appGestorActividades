import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Activity } from 'src/app/Models/activity';
import { ModalAlertComponent } from '../../Modal/modal-alert/modal-alert.component';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit, OnChanges {

  @ViewChild(ModalAlertComponent, {static: false}) modalAlert!: ModalAlertComponent;

  @Input() actividadCarg!: Activity;
  public actividad!: Activity;

  public editarActsForm!:FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['actividadCarg'].currentValue!=undefined){
      this.crearFormulario();
      this.actividad = this.actividadCarg;
      this.cargarForm();
    }
  }

  guardarDatos(){
    let updateActivity: Activity = new Activity();
    if(this.editarActsForm.invalid){
      if(this.editarActsForm.get("nombre")?.status == "INVALID" || this.editarActsForm.get("descripcion")?.status == "INVALID"){
        let message = "Por favor verificar los campos del formulario.";
        this.abrirModalAlert(message)
      }

    }else{
      updateActivity._id = this.actividad._id;
      updateActivity.nameActivity = this.editarActsForm.get('nombre')?.value;
      updateActivity.descActivity = this.editarActsForm.get('descripcion')?.value;
    }

    return updateActivity; 
  }

  abrirModalAlert(message: string){
    this.modalAlert.mostrar(message);
  }

  
  get nombreControl(): FormControl{
    return this.editarActsForm.get('nombre') as FormControl
  }

  get descripcionControl(): FormControl{
    return this.editarActsForm.get('descripcion') as FormControl
  }

  get nombreNoValido() {
    if(this.editarActsForm.get('nombre')?.touched){
      if(this.editarActsForm.get('nombre')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }
  get descripcionNoValido() {
    if(this.editarActsForm.get('descripcion')?.touched){
      if(this.editarActsForm.get('descripcion')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('apellido')?.invalid && this.registroForm.get('apellido')?.touched;
  }


  crearFormulario() {
    this.editarActsForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
  }

  cargarForm(){
    this.editarActsForm.get('nombre')?.patchValue(this.actividad.nameActivity)
    this.editarActsForm.get('descripcion')?.patchValue(this.actividad.descActivity)
  }

}
