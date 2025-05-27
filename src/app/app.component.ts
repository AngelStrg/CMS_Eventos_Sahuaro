import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginEventosSahuaroComponent } from './components/login-eventos-sahuaro/login-eventos-sahuaro.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginEventosSahuaroComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CMS_Eventos_Sahuaro';
}
