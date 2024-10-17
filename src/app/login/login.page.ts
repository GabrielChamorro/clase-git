import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { LoginService } from './../servicio/login.service'
//FormBuilder es el servicio
//validators son funciones de validacion


//PREGUNTA DE PRUEBA: la injeccion de dependencias se hace en el constructor
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formulario: FormGroup;
  constructor(
    //se injectan siempre servicios y directivas de la siguiente manera
    private fb: FormBuilder,
    public login: LoginService
  ) { 
    //el login tiene 2 campos
    //usuario y contrasenia (intentar no usar ñ)
    this.formulario = fb.group({
      //nombre_del_campo: ["valor", [validaciones sync], [validaciones async]]
      //determina automaticamente cual validacion es sincrona y asincrona por el orden

      //validaciones a nivel de campo
      usuario: ["" ,[Validators.required]], //como valor inicial este vacio
      contrasenia: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  public obtenerDatosFormulario(){
    const esValido = this.formulario.valid;
    if(!esValido){
      alert("formulario es invalido")
      return
    }
    const usuario = this.formulario.getRawValue()?.usuario;
    const contrasenia = this.formulario.getRawValue()?.contrasenia;
    this.login.iniciarSesion(usuario, contrasenia)
    //Ctrl+} para comentar bloques
    console.log("el formulario es valido:", this.formulario.valid);
    console.log("los datos son:",this.formulario.getRawValue());
    //validaciones a nivel formulario
    console.log("los errores son:",this.formulario.errors);
    //simbolo de pregunta indica que intenta
    //esto es por campo
    console.log(this.formulario.get("usuario")?.errors);
    console.log(this.formulario.get("contrasenia")?.errors);
  }


  ngOnInit() {
  }

}
