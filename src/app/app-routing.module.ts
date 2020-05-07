import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from './shared/auth-gaurd';


const routes: Routes = [
  {
    path: "ac",
    loadChildren: () =>
      import("./authentication/auth.module").then((m) => m.AuthModule),
  },

  {
    path: "",
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGaurd],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd],
})
export class AppRoutingModule { }
