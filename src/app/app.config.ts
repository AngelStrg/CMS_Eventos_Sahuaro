import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { Routes } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp({
      projectId: "eventos-sahuaro",
      appId: "1:927912995819:web:87ef942c7a02df24b3c7ae",
      storageBucket: "eventos-sahuaro.firebasestorage.app",
      apiKey: "AIzaSyDvjLsLxS2EYq-oCl5fh_bWx1lrb54478M",
      authDomain: "eventos-sahuaro.firebaseapp.com",
      messagingSenderId: "927912995819"
    })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()), // << NECESARIO
    provideFirestore(() => getFirestore())
  ]

};
