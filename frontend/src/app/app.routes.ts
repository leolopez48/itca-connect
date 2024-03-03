import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
    },
    {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    }
];
