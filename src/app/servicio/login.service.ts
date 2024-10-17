import { Injectable } from '@angular/core';
import { UsuarioLogin } from './../interfaces/UsuarioLogin';
import { HttpClient } from '@angular/common/http';
import { delay, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly URL_LOGIN = "https://dummyjson.com/auth/login";
  //comportamiento del loading
  private cargando = new BehaviorSubject<boolean>(false);
  public $cargando = this.cargando.asObservable();
  //variable del usuario
  public usuarioActivo: UsuarioLogin | null = null;

  constructor(
    private Http: HttpClient
  ) { }
  
  public iniciarSesion(usuario: string, contrasenia: string){
    const cuerpo = {
      username: usuario,
      password: contrasenia
    }
    this.cargando.next(true);
    this.Http.post<UsuarioLogin>(
      this.URL_LOGIN,
      JSON.stringify(cuerpo),
      {
        headers:{
          "Content-type": "application/json"
        }
      }
    )
    .pipe(delay(2000))
    .subscribe( datos => {
      this.usuarioActivo = datos;
      this.cargando.next(false);
      console.log(datos);
    });
  }

}
