import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'calendar',
    canActivate: [AuthGuard],
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'map',
    canActivate: [AuthGuard],
    loadChildren: () => import('./map/map.module').then(m => m.MapModule)
  },
  {
    path: 'analyze',
    canActivate: [AuthGuard],
    loadChildren: () => import('./analyze/analyze.module').then(m => m.AnalyzeModule)
  },
  {
    path: 'frequent',
    canActivate: [AuthGuard],
    loadChildren: () => import('./frequent-answer/frequent-answer.module').then(m => m.FrequentAnswerModule)
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }