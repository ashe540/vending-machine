import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
// import { AuthenticationGuard } from '@app/core';
// import { LoginComponent } from '@app/login/login.component';
// import { LoggedInGuard } from '@app/shared/guards/logged-in/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [],
      },
    ],
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./modules/main.module').then((m) => m.MainModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
