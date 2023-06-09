import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {
    redirectUnauthorizedTo,
    redirectLoggedInTo,
    canActivate
  } from '@angular/fire/auth-guard';
import{TabsPageModule} from './pages/tabs/tabs.module';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['welcome']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
    // ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule),
    // ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'create-club',
    loadChildren: () => import('./pages/create-club/create-club.module').then( m => m.CreateClubPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./pages/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create-task',
    loadChildren: () => import('./pages/create-task/create-task.module').then( m => m.CreateTaskPageModule)
  },
  {
    path: 'create-meeting',
    loadChildren: () => import('./pages/create-meeting/create-meeting.module').then( m => m.CreateMeetingPageModule)
  },
  {
    path: '**', redirectTo: 'welcome'
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
