import { Routes } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';;
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { DishdetailComponent } from './components/dishdetail/dishdetail.component';

export const ROUTES: Routes =
[
    { path: 'home', component: HomeComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'contactus', component: ContactComponent },
    { path: 'aboutus', component: AboutComponent },
    { path: 'dishdetail/:id', component: DishdetailComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];