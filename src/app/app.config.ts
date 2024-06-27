import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptor } from './interceptor/jwtInterceptor';
import { ErrorInterceptor } from './interceptor/errorInterceptor';

export const appConfig: ApplicationConfig = {
 providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([JwtInterceptor,ErrorInterceptor]))
  ]
};
