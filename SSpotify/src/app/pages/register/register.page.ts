import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule ]
})
export class RegisterPage implements OnInit {
  public username = '';
  public password = '';
  public email = '';
  public rol = '';

  public LoginService = new LoginService();
  constructor(public router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token')) this.router.navigate(['/tabs']);
    return;
  }

  async register() {
    try {
      console.log(this.username, this.password, this.email, this.rol);
      if (
        this.username === '' ||
        this.password === '' ||
        this.email === '' ||
        this.rol === ''
      ) {
        alert('Porfavor completa todos los campos');
        return;
      }

      const parsedData = {
        username: this.username,
        email: this.email,
        rol: this.rol,
        password: this.password,
      };
      const result = (await this.LoginService.sendRegisterRequest(
        parsedData
      )) as any;

      console.log(result);

      if (!result || result?.error) {
        throw new Error(`Ocurrio un error al registrarse. ${result?.error}`);
      }

        alert('Vaya a su correo para activar la cuenta')
      } catch (error: any) {
        console.error(`Error al registrarse ${error.error.error}`);
        alert(`Error al registrarse ${error.error.error}`);
      } finally {
      }
    }
  }
