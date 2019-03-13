import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NbAuthComponent } from '@nebular/auth';
import { SignComponent } from './sign/sign.component';
import { DetailsComponent } from './details/details.component';
import { NbAuthGuard } from './auth-guard.service';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

const routes: Routes = [
  {path:'',redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  // ,canActivate: [NbAuthGuard]
  {path:'hero',component:SignComponent},
  {path:'edit/:id',canActivate: [NbAuthGuard],component:EditHeroComponent},
  { path: 'admin',canActivate: [NbAuthGuard],component: HomeAdminComponent},
  {path:'details/:id',component:DetailsComponent},
  {
    path: 'auth',
    loadChildren: './auth/smart-home-auth.module#AuthModule',
  },
  {path:'login',redirectTo:'/auth/login',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: "enabled",
    onSameUrlNavigation: "reload",
    scrollPositionRestoration: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
