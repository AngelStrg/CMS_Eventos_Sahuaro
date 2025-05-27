import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginEventosSahuaroComponent } from "../login-eventos-sahuaro/login-eventos-sahuaro.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CostComponent } from "../cost/cost.component";
import { DatesComponent } from "../dates/dates.component";
import { MediaComponent } from "../media/media.component";
import { StockComponent } from "../stock/stock.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, RouterModule, CommonModule, LoginEventosSahuaroComponent, NavBarComponent, CostComponent,
    DatesComponent, MediaComponent, StockComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
constructor(private titleService: Title) {}

ngOnInit() {
  this.titleService.setTitle('Pagina principal');
}

}
