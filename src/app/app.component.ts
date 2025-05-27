import { Component } from '@angular/core';
import { LoginEventosSahuaroComponent } from './components/login-eventos-sahuaro/login-eventos-sahuaro.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [ LoginEventosSahuaroComponent, NavBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CMS_Eventos_Sahuaro';
}
