import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { mergeApplicationConfig } from '@angular/core';

bootstrapApplication(AppComponent, mergeApplicationConfig(appConfig, {
  providers: [provideClientHydration(withEventReplay())]
}))
  .catch((err) => console.error(err));
