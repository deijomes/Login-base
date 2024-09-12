import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 usuario: UsuarioModel

  constructor( private auth: AuthService, private router : Router) { }

  ngOnInit() {
    this.usuario =  new UsuarioModel();
    
  }

   onSubmit(form : NgForm){
    
    if (form.invalid) { return}
    console.log(form)
     

    this.auth.nuevoUsuario(this.usuario).subscribe(
      (resp: any) => {
          console.log('Registro exitoso:', resp);
          this.router.navigateByUrl('/home')
          
    
    } 
    )};
}
