import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginEventosSahuaroComponent } from './components/login-eventos-sahuaro/login-eventos-sahuaro.component';

import { StockComponent } from './components/stock/stock.component';
import { OurCostsComponent } from './components/our-costs/our-costs.component';
import { OurDatesComponent } from './components/our-dates/our-dates.component';
import { AdditionalServicesComponent } from './components/additional-services/additional-services.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LoginEventosSahuaroComponent, title: 'main' },
    {path: 'app-main-page', component: MainPageComponent, title: 'main', canActivate: [authGuard]},
    
    { path: 'app-our-cost', component: OurCostsComponent, title: 'cost', canActivate: [authGuard]},
    { path: 'app-our-dates', component: OurDatesComponent, title: 'dates', canActivate: [authGuard]},
    {path: 'app-stock', component: StockComponent, title: 'stock', canActivate: [authGuard] },
    {path: 'app-additional-services', component: AdditionalServicesComponent, title: 'app-additional-services', canActivate: [authGuard]},
];
