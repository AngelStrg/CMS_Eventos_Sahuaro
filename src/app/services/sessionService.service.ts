import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private auth: Auth) {
    // Comprobar que window existe (solo navegador)
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.auth.signOut();
      });
    }
  }
}