import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { NbAuthModule, NbPasswordAuthStrategy ,NbAuthJWTToken} from '@nebular/auth';
import { NbThemeModule } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SignComponent } from './sign/sign.component';
import { DetailsComponent } from './details/details.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {NgImageSliderModule} from 'ng-image-slider';
import { NbAuthGuard } from './auth-guard.service';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';

import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignComponent,
    DetailsComponent,
    HomeAdminComponent,
    EditHeroComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    NgImageSliderModule,
    NgxLoadingModule.forRoot({}),
    NgbModule.forRoot(),
    NbThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
 
          baseEndpoint: '/heroes/public/api/auth/',
          login: {
            method:'post',
            
            redirect: {
            success: '/admin',
                failure: null,
              }
          },
         token:{
           class:NbAuthJWTToken,
           key: 'token'
         },
         
       
        }),
 
      ],
    }),
  ],
  providers: [NbAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
