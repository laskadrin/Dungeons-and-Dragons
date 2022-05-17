import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/dashboard']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  { path: 'dice', loadChildren: () => import('./features/dice/dice.module').then(m => m.DiceModule) },
  { path: 'world-info', loadChildren: () => import('./features/world-info/world-info.module').then(m => m.WorldInfoModule) },
  { path: 'player-rofile', loadChildren: () => import('./features/player-profile/player-profile.module').then(m => m.PlayerProfileModule) },
  { path: 'rules', loadChildren: () => import('./features/rules/rules.module').then(m => m.RulesModule) },
  { path: 'armoury', loadChildren: () => import('./features/armoury/armoury.module').then(m => m.ArmouryModule) },
  { path: 'classes', loadChildren: () => import('./features/classes/classes.module').then(m => m.ClassesModule) },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
