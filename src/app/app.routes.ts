import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MediaComponent } from './components/media/media.component';
import { MainPageComponent } from './components/main-page/main-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent, title: 'main' },
    { path: 'app-media', component: MediaComponent, title: 'media' },
];
