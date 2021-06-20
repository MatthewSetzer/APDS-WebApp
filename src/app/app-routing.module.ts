import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {PostComponent} from './post/post.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component:PostComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{ }
