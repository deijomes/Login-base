import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loguin: UsuarioModel = new UsuarioModel();
  recordarme = false;

  
  constructor(private auth :AuthService,  private route : Router) { }

  ngOnInit() {

    if(localStorage.getItem('email')){
      this.loguin.emmail = localStorage.getItem('email')
      this.recordarme = true
    }


  }

  onSumit(form:NgForm){

    if (form.invalid){return}

    this.auth.login(this.loguin).
    subscribe(resp=> {console.log(resp)

      if(this.recordarme = true){
        localStorage.setItem('email',this.loguin.emmail)
      }

      this.route.navigateByUrl('/home')
    })
    
    

  }
  

}
