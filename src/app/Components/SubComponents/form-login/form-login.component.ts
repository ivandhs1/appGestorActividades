import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { ModalAlertComponent } from '../../Modal/modal-alert/modal-alert.component';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  @ViewChild(ModalAlertComponent, {static: false}) modalAlert!: ModalAlertComponent;

  public loginForm!:FormGroup;

  @Output() eventCreado = new EventEmitter<User>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  ingresar(){
    let newUser: User = new User();
    if(this.loginForm.invalid){
      if(this.loginForm.get("name")?.status == "INVALID" || this.loginForm.get("password")?.status == "INVALID"){
        let message = "Por favor verificar los campos del formulario.";
        this.abrirModalAlert(message)
      }
    }else{
      newUser.nameUser = this.loginForm.get('name')?.value;
      newUser.emailUser = this.loginForm.get('email')?.value;   
      this.eventCreado.emit(newUser);
    }

  }

  abrirModalAlert(message: string){
    this.modalAlert.mostrar(message);
  }

  get nombreControl(): FormControl{
    return this.loginForm.get('name') as FormControl
  }

  get emailControl(): FormControl{
    return this.loginForm.get('email') as FormControl
  }

  get nombreNoValido() {
    if(this.loginForm.get('name')?.touched){
      if(this.loginForm.get('name')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }
  get emailNoValido() {
    if(this.loginForm.get('email')?.touched){
      if(this.loginForm.get('email')?.invalid == false){
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
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })
  }

}
