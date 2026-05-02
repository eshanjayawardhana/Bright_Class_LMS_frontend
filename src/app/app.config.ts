import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// HttpClient and Interceptor imports
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
// Interceptor
import { authInterceptor } from './core/interceptors/auth.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // HttpClient and Interceptor setup
    provideHttpClient(withInterceptors([authInterceptor])) 
  ]
};