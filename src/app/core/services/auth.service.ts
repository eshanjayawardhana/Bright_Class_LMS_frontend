import { Injectable } from '@angular/core';
import {
  AuthApiService,
  LoginRequest,
} from '../../features/auth/services/auth-api.service';
import { TokenService } from './token.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private api: AuthApiService,
    private tokenService: TokenService,
  ) {}

  login(data: LoginRequest) {
    return this.api.login(data).pipe(
      tap((res) => {
        this.tokenService.setToken(res.data.token);
        localStorage.setItem('userRole', res.data.role);
        localStorage.setItem('userEmail', res.data.email);
      }),
    );
  }

  logout() {
    this.tokenService.clearToken();
  }

  isAuthenticated(): boolean {
    return this.tokenService.isLoggedIn();
  }
}
