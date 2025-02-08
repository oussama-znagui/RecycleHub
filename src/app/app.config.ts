import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './features/auth/state/auth.reducer';
import { AuthEffects } from './features/auth/state/auth.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { dropOffRequestsReducer } from './features/drop-off-request/state/drop-off-requests.reducer';
import { DropOffRequestsEffects } from './features/drop-off-request/state/drop-off-requests.effects';

export const appConfig: ApplicationConfig = {
  providers: [
   
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({auth: authReducer, dropOffRequests: dropOffRequestsReducer}),
    importProvidersFrom(ReactiveFormsModule),
    provideEffects(AuthEffects,DropOffRequestsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient()],
   
};
