import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

import 'hammerjs';

import { AppComponent } from './components/root/root.component';

import { NumberToArrayPipe } from './pipes/number-to-array.pipe';

import { MenuComponent } from './components/menu/menu.component';
import { DishDetailComponent } from './components/dishdetail/dishdetail.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component'

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHttpMessageService } from './services/process-http-message.service';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';

import { BASE_URL } from './shared/baseurl';

@NgModule(
    {
        declarations:
        [
            AppComponent,
            NumberToArrayPipe,
            MenuComponent,
            DishDetailComponent,
            HeaderComponent,
            FooterComponent,
            HomeComponent,
            AboutComponent,
            ContactComponent,
            LoginComponent
        ],
        imports:
        [
            BrowserModule,
            BrowserAnimationsModule,
            HttpClientModule,
            MatProgressSpinnerModule,
            FlexLayoutModule,
            MatToolbarModule,
            MatListModule,
            MatGridListModule,
            MatCardModule,
            MatButtonModule,
            AppRoutingModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            MatCheckboxModule,
            FormsModule,
            ReactiveFormsModule,
            MatSelectModule,
            MatSlideToggleModule,
            MatSliderModule
        ],
        providers:
        [
            { provide: 'BaseUrl', useValue: BASE_URL },
            DishService,
            PromotionService,
            LeaderService,
            ProcessHttpMessageService
        ],
        bootstrap:
        [
            AppComponent
        ],
        entryComponents:
        [
            LoginComponent
        ]
    })
export class AppModule
{
}