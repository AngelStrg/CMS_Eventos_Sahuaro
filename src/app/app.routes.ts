import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginEventosSahuaroComponent } from './components/login-eventos-sahuaro/login-eventos-sahuaro.component';
import { MediaComponent } from './components/media/media.component';
import { StockComponent } from './components/stock/stock.component';
import { OurCostsComponent } from './components/our-costs/our-costs.component';
import { OurDatesComponent } from './components/our-dates/our-dates.component';

export const routes: Routes = [
    { path: '', component: LoginEventosSahuaroComponent, title: 'main' },
    {path: 'app-main-page', component: MainPageComponent, title: 'main'},
    { path: 'app-media', component: MediaComponent, title: 'media' },
    { path: 'app-our-cost', component: OurCostsComponent, title: 'cost' },
    { path: 'app-our-dates', component: OurDatesComponent, title: 'dates' },
    {path: 'app-stock', component: StockComponent, title: 'stock' },
];
