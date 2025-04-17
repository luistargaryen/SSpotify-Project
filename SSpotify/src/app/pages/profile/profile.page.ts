import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  public userName = '';
  public password = '';
  public email = '';
  public dateOfBirth = new Date().toISOString();
  public role = '';
  public idArtist?: string = '';
  public loginService = inject(LoginService);
  public renderingArtist = false;

  constructor(public router: Router) { }

  async ngOnInit() {
    try {
      const data = (await this.loginService.obtainDataUser()) as any;

      const formattedDateOfBirth = data.dateOfBirth.split('T')[0];

      this.userName = data.userName;
      this.email = data.email;
      this.dateOfBirth = formattedDateOfBirth;
      this.role = data.role;
      this.idArtist = data.idArtist;

      console.log(this.role === 'artist' && this.idArtist);
      if (this.role === 'artist' && this.idArtist) {
        this.renderingArtist = true;
      }

      console.log(this.renderingArtist);
    } catch (error) {
      console.error(error);
    }
  }
  
  async updateDataUser() {
    const dataToUpdate: any = {
      userName: this.userName,
      email: this.email,
      dateOfBirth: this.dateOfBirth.split('T')[0],
    };

    if (this.password) {
      dataToUpdate.password = this.password;
    }

    await this.loginService.updateDataUser(dataToUpdate);
  }

  async handleCLickUpdate() {
    try {
      await this.updateDataUser();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAccount() {
    await this.loginService.deleteAccount();
    this.router.navigate(['/main']);
  }
  catch(error: any) {
    console.error(error);
  }

}
