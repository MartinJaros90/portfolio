import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './legal/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal/legal-notice/legal-notice.component';
import { HomeComponent } from './home.components';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { scrollPositionRestoration: 'disabled' },
  },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent,
    data: { scrollPositionRestoration: 'enabled' },
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: { scrollPositionRestoration: 'enabled' },
  },
];
