import { inject, Injectable } from '@angular/core';
import { Auth, browserSessionPersistence, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { setPersistence } from '@firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  login(email: string, password: string) {
  return setPersistence(this.auth, browserSessionPersistence).then(() => {
  return signInWithEmailAndPassword(this.auth, email, password);
});
}

  logout() {
    return signOut(this.auth).then(() => this.router.navigate(['/']));
  }

  

  

  constructor() { }
}
