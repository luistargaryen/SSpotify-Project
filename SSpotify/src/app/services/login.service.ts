import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { URL_REQUEST } from 'src/constants';
import { RegisterData } from '../models/RegisterData.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public httpClient = inject(HttpClient);
  private loaderService = inject(LoaderService);

  constructor() { }

  sendLoginRequest(username: string, password: string) {
    this.loaderService.show();
    return firstValueFrom(
      this.httpClient
        .post(URL_REQUEST.LOGIN, { username, password })
        .pipe(finalize(() => this.loaderService.hide()))
    );
  }

  sendRegisterRequest(register: RegisterData) {
    const { username, password, email, rol } = register;
    this.loaderService.show();
    return firstValueFrom(
      this.httpClient
        .post(URL_REQUEST.REGISTER, {
          username,
          password,
          email,
          rol,
        })
        .pipe(finalize(() => this.loaderService.hide()))
    );
  }

  obtainDataUser() {
    const token = localStorage.getItem('token');
    this.loaderService.show();
    return firstValueFrom(
      this.httpClient
        .get(URL_REQUEST.OBTAIN_DATA_USER, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .pipe(finalize(() => this.loaderService.hide()))
    );
  }

  updateDataUser(data: RegisterData) {
    const token = localStorage.getItem('token');
    this.loaderService.show();
    return firstValueFrom(
      this.httpClient
        .put(URL_REQUEST.UPDATE_DATA_USER, data, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .pipe(finalize(() => this.loaderService.hide()))
    );
  }

  deleteAccount() {
    const token = localStorage.getItem('token');
    this.loaderService.show();
    return firstValueFrom(
      this.httpClient
        .delete(URL_REQUEST.DELETE_USER, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .pipe(finalize(() => this.loaderService.hide()))
    );
  }

}
