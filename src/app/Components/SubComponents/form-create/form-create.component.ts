import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Activity } from 'src/app/Models/activity';
import { ModalAlertComponent } from '../../Modal/modal-alert/modal-alert.component';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {

  @ViewChild(ModalAlertComponent, {static: false}) modalAlert!: ModalAlertComponent;
  public crearActsForm!:FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  guardarDatos(){
    let newActivity: Activity = new Activity();
    if(this.crearActsForm.invalid){
      if(this.crearActsForm.get("nombre")?.status == "INVALID" || this.crearActsForm.get("descripcion")?.status == "INVALID"){
        let message = "Por favor verificar los campos del formulario.";
        this.abrirModalAlert(message)
      }
    }else{
      newActivity.nameActivity = this.crearActsForm.get('nombre')?.value;
      newActivity.descActivity = this.crearActsForm.get('descripcion')?.value;
      newActivity.stateActivity = 0;
      newActivity.userAsignado = "";
      newActivity.setTime = new Date();      
    }
    return newActivity;
  }

  abrirModalAlert(message: string){
    this.modalAlert.mostrar(message);
  }

  get nombreControl(): FormControl{
    return this.crearActsForm.get('nombre') as FormControl
  }

  get descripcionControl(): FormControl{
    return this.crearActsForm.get('descripcion') as FormControl
  }

  get nombreNoValido() {
    if(this.crearActsForm.get('nombre')?.touched){
      if(this.crearActsForm.get('nombre')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }
  get descripcionNoValido() {
    if(this.crearActsForm.get('descripcion')?.touched){
      if(this.crearActsForm.get('descripcion')?.invalid == false){
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
    this.crearActsForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
  }

}
