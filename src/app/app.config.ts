import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { routes } from './app.routes';
import { icons } from './icons-provider';
import { PermissionStates } from './modules/permission/data-access/store';
import { RoleStates } from './modules/role/data-access/store';
import { NGXS_DEVTOOLS_CONFIG } from './shared/utils/ngx-config';

// Register Angular locale data for English
registerLocaleData(en);

/**
 * Application-level configuration using standalone APIs
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Optimize zone-based change detection
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Set up routing
    provideRouter(routes),

    // Provide Ant Design icons and locale
    provideNzIcons(icons),
    provideNzI18n(en_US),

    // Import FormsModule for template-driven forms
    importProvidersFrom(FormsModule),

    // Enable animations asynchronously
    provideAnimationsAsync(),

    // Provide HttpClient for API communication
    provideHttpClient(),

    // Set up NGXS state management with dev tools and router integration
    provideStore(
      [PermissionStates, RoleStates],
      withNgxsReduxDevtoolsPlugin({ ...NGXS_DEVTOOLS_CONFIG }), // Enable Redux devtools
      withNgxsLoggerPlugin({ ...NGXS_DEVTOOLS_CONFIG }), // Enable NGXS logger
      withNgxsRouterPlugin(), // Integrate router state with NGXS
    ),
  ],
};
