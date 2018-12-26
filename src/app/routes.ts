import { Routes } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';;
import { HomeComponent } from './components/home/home.component';
////import { AboutComponent } from './components/about/about.component';
////import { ContactComponent } from './components/contact/contact.component';
////import { DishdetailComponent } from './components/dishdetail/dishdetail.component';

export const ROUTES: Routes =
[
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'menu', component: MenuComponent }
];