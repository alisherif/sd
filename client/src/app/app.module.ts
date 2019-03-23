import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
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
import {MatSidenavModule} from '@angular/material/sidenav';

import {NgImageSliderModule} from 'ng-image-slider';
import { NbAuthGuard } from './auth-guard.service';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';

import { NgxLoadingModule } from 'ngx-loading';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent, NgbdModalContent } from './gallery/gallery.component';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignComponent,
    DetailsComponent,
    HomeAdminComponent,
    EditHeroComponent,
    ContactusComponent,
    FooterComponent,
    GalleryComponent,
    NgbdModalContent 
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NgImageSliderModule,
    RecaptchaModule,
    RecaptchaFormsModule,
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
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  entryComponents: [NgbdModalContent],
  providers: [NbAuthGuard ,{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
