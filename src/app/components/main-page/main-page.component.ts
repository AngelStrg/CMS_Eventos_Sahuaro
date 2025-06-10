import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginEventosSahuaroComponent } from "../login-eventos-sahuaro/login-eventos-sahuaro.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CostComponent } from "../cost/cost.component";
import { DatesComponent } from "../dates/dates.component";

import { StockComponent } from "../stock/stock.component";
import { Title } from '@angular/platform-browser';
import { OurServicesComponent } from '../our-services/our-services.component';
import { AdditionalServicesComponent } from '../additional-services/additional-services.component';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, RouterModule, CommonModule, LoginEventosSahuaroComponent, NavBarComponent, CostComponent,
    DatesComponent, StockComponent, OurServicesComponent, AdditionalServicesComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
constructor(private titleService: Title) {}

ngOnInit() {
  this.titleService.setTitle('Pagina principal');
}

}
