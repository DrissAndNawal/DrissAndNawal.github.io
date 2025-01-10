import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { AppComponent } from '@app/components/app/app.component';
import { MainPageComponent } from '@app/pages/main-page/main-page.component';
import { MapPageComponent } from '@app/pages/map-page/map-page.component';
import { RsvpPageComponent } from '@app/pages/rsvp-page/rsvp-page.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: MainPageComponent },
    { path: 'rsvp', component: RsvpPageComponent },
    { path: 'map', component: MapPageComponent },
    { path: '**', redirectTo: '/home' },
];

bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(), provideRouter(routes), provideAnimations()],
})
