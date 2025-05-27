import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MediaComponent } from './components/media/media.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginEventosSahuaroComponent } from './components/login-eventos-sahuaro/login-eventos-sahuaro.component';

export const routes: Routes = [
    { path: '', component: LoginEventosSahuaroComponent, title: 'main' },
    {path: 'app-main-page', component: MainPageComponent, title: 'main'},
    { path: 'app-media', component: MediaComponent, title: 'media' },
];
