import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import 'hammerjs';

import { AppComponent } from './components/root/root.component';
import { MenuComponent } from './components/menu/menu.component';;
import { DishdetailComponent } from './components/dishdetail/dishdetail.component';

import { NumberToArrayPipe } from './pipes/number-to-array.pipe';

import { DishService } from './services/dish.service';;
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'

@NgModule(
    {
        declarations:
        [
            AppComponent,
            MenuComponent,
            DishdetailComponent,
            NumberToArrayPipe,
            HeaderComponent,
            FooterComponent
        ],
        imports:
        [
            BrowserModule,
            BrowserAnimationsModule,
            FlexLayoutModule,
            MatToolbarModule,
            MatListModule,
            MatGridListModule,
            MatCardModule,
            MatButtonModule
        ],
        providers:
        [
            DishService
        ],
        bootstrap:
        [
            AppComponent
        ]
    })
export class AppModule
{
}