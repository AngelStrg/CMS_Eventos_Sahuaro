import { Component } from '@angular/core';
import { LoginEventosSahuaroComponent } from './components/login-eventos-sahuaro/login-eventos-sahuaro.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { CostComponent } from './components/cost/cost.component';
import { SessionService } from './services/sessionService.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  imports: [ LoginEventosSahuaroComponent,NavBarComponent,CostComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private auth: Auth) {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.auth.signOut();
      });
    }
  }
}
