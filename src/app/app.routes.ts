import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'sales',
        loadComponent: () =>
          import('./features/sales/components/sales/sales.component').then(m => m.SalesComponent),
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./features/inventory/components/inventory/inventory.component').then(m => m.InventoryComponent),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/components/reports/reports.component').then(m => m.ReportsComponent),
      },
    ],
  },
];

export const appConfig = {
  providers: [provideRouter(routes)],
};
