import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginEventosSahuaroComponent } from './components/login-eventos-sahuaro/login-eventos-sahuaro.component';
import { CostComponent } from './components/cost/cost.component';
import { DatesComponent } from './components/dates/dates.component';
import { MediaComponent } from './components/media/media.component';
import { StockComponent } from './components/stock/stock.component';
import { OurCostsComponent } from './components/our-costs/our-costs.component';

export const routes: Routes = [
    { path: '', component: LoginEventosSahuaroComponent, title: 'main' },
    {path: 'app-main-page', component: MainPageComponent, title: 'main'},
    { path: 'app-media', component: MediaComponent, title: 'media' },
    { path: 'app-our-cost', component: OurCostsComponent, title: 'cost' },
    { path: 'app-dates', component: DatesComponent, title: 'dates' },
    {path: 'app-stock', component: StockComponent, title: 'stock' },
];
