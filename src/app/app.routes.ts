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
        path: 'master',
        children: [
          {
            path: 'bankname',
            loadComponent: () =>
              import('./features/master/components/bankname/bankname.component').then(m => m.BankNameComponent),
          },
          {
            path: 'bank-master',
            loadComponent: () =>
              import('./features/master/components/bank-master/bank-master.component').then(m => m.BankMasterComponent),
          },
          {
            path: 'group-master',
            loadComponent: () =>
              import('./features/master/components/group-master/group-master.component').then(m => m.GroupMasterComponent),
          },
          {
            path: 'brand-master',
            loadComponent: () =>
              import('./features/master/components/brand-master/brand-master.component').then(m => m.BrandMasterComponent),
          },
          {
            path: 'table-master',
            loadComponent: () =>
              import('./features/master/components/table-master/table-master.component').then(m => m.TableMasterComponent),
          },
          {
            path: 'unit-master',
            loadComponent: () =>
              import('./features/master/components/unit-master/unit-master.component').then(m => m.UnitMasterComponent),
          }
        ]
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
