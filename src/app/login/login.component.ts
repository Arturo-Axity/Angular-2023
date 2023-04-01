import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { LoginRequest } from '../model/login.model';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin?: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private LoginSvc: LoginService,
    private router: Router,
    private utilSvc: UtilService
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginClick() {
    this.isLoading = true;
    console.log('CLICK EN LOGIN!!');
    console.log('valor form', this.formLogin?.value);
    const req = this.formLogin?.value as LoginRequest;
    this.LoginSvc.login(req).subscribe({
      next: (response) => {
        console.log('RESPUESTA', response);
        this.utilSvc.saveToken(response.token);
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log('ERROR', err);
      },
      complete: () => {
        this.isLoading = false;
        console.log('COMPLETED!!!');
      },
    });

    console.log('YA SE ENVIO LA PETICION');
  }
}
