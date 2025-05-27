import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginEventosSahuaroComponent } from "../login-eventos-sahuaro/login-eventos-sahuaro.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, RouterModule, CommonModule, LoginEventosSahuaroComponent, NavBarComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
