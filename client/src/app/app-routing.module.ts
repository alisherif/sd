import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NbAuthComponent } from '@nebular/auth';
import { SignComponent } from './sign/sign.component';
import { DetailsComponent } from './details/details.component';
import { NbAuthGuard } from './auth-guard.service';

const routes: Routes = [
  {path:'',redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  {path:'hero',canActivate: [NbAuthGuard],component:SignComponent},
  {path:'details/:id',component:DetailsComponent},
  {
    path: 'auth',
    loadChildren: './auth/smart-home-auth.module#AuthModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
