import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        // canActivate: [AuthGuard],
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
        loadChildren: () => import('./map/map.module').then(m => m.MapModule)
    },
    {
        path: 'analyze',
        loadChildren: () => import('./analyze/analyze.module').then(m => m.AnalyzeModule)
    },
];
