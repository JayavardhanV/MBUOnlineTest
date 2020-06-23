import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { PostviewComponent } from './components/postview/postview.component'
import { ResourceComponent } from './components/resource/resource.component'
import { Authguard } from '../app/helpers/AuthGaurd/authguard'

const routes: Routes = [
  { path: '', component: PostviewComponent, canActivate: [Authguard] },
  { path: 'posts', component: PostviewComponent , canActivate: [Authguard]},
  { path: 'login', component: LoginComponent },
  { path: 'resource', component: ResourceComponent, canActivate: [Authguard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
