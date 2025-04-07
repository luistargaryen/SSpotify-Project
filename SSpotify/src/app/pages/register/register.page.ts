import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule, RouterLink ]
})
export class RegisterPage implements OnInit {
  public username = '';
  public password = '';
  public email = '';
  public rol = '';

  constructor(public router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token')) this.router.navigate(['/tabs']);
    return;
  }

  async register() {
    // try {
    //   console.log(this.username, this.password, this.email, this.rol);
    //   if (
    //     this.username === '' ||
    //     this.password === '' ||
    //     this.email === '' ||
    //     this.rol === ''
    //   ) {
    //     alert('Porfavor completa todos los campos');
    //     return;
    //   }

    //   const result = (await this.loginService.sendRegisterRequest(
    //     username: this.username,
    //     password: this.password,
    //     email: this.email,
    //     rol: this.rol
    //   )) as any;

    //   console.log(result);

    //   if (!result || result?.error) {
    //     throw new Error(`Ocurrio un error al registrarse. ${result?.error}`);
    //   }

    //     alert('Vaya a su correo para activar la cuenta')
    //   } catch (error: any) {
    //     console.error(`Error al registrarse ${error.error.error}`);
    //     alert(`Error al registrarse ${error.error.error}`);
    //   } finally {
    //   }
    // }
  }
}
