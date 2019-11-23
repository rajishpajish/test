import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { FlowComponent } from '../flow/flow.component';
import { MarketDetailComponent } from '../marketdetail/marketdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'flow',     component: FlowComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: 'aboutus',     component: AboutComponent },
  { path: 'marketdetail/:id',     component: MarketDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];