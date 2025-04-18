import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent }, 
  { path: "signup", component: SignupComponent }, 
  { path: "addcontact", component: AddcontactComponent,canActivate: [AuthGuard] },
  { path: "contactlist", component: ContactlistComponent, canActivate: [AuthGuard] },
  { path: "edit", component: EditComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
