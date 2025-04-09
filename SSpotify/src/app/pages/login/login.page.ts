import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoaderService } from 'src/app/services/loader.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  loginService = inject(LoginService);
  loaderService = inject(LoaderService);

  constructor(private router: Router) { }

  ngOnInit() {
    this.loaderService.hide();
    if (localStorage.getItem('token')) this.router.navigate(['/tabs']);
    return;
  }

  async login() {
    try {
      this.loaderService.show();
      alert('Iniciando sesion')
      const result = (await this.loginService.sendLoginRequest(
        this.username,
        this.password
      )) as any;
      localStorage.setItem('token', result.token);
      this.router.navigate(['/tabs']);
      alert('Sesion iniciada')
      return;
    } catch (error) {
      console.error('Error al iniciar sesion', error);
      alert('Error al iniciar sesion')
    } finally {
      this.loaderService.hide();
    }
  }
}
