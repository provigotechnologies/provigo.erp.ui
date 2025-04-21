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
            path: 'company-master',
            loadComponent: () =>
              import('./features/master/components/company-master/company-master.component').then(m => m.CompanyMasterComponent),
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
          },
          {
            path: 'department-master',
            loadComponent: () =>
              import('./features/master/components/department-master/department-master.component').then(m => m.DepartmentMasterComponent),
          },
           {
            path: 'designation-master',
            loadComponent: () =>
              import('./features/master/components/designation-master/designation-master.component').then(m => m.DesignationMasterComponent),
          },
          {
            path: 'expense-master',
            loadComponent: () =>
              import('./features/master/components/expense-master/expense-master.component').then(m => m.ExpenseMasterComponent),
          },
          {
            path: 'holiday-master',
            loadComponent: () =>
              import('./features/master/components/holiday-master/holiday-master.component').then(m => m.HolidayMasterComponent),
          },
          {
            path: 'location-master',
            loadComponent: () =>
              import('./features/master/components/location-master/location-master.component').then(m => m.LocationMasterComponent),
          },
          {
            path: 'product-master',
            loadComponent: () =>
              import('./features/master/components/product-master/product-master.component').then(m => m.ProductMasterComponent),
          },
          {
            path: 'service-master',
            loadComponent: () =>
              import('./features/master/components/service-master/service-master.component').then(m => m.ServiceMasterComponent),
          },
          {
            path: 'discount-scheme',
            loadComponent: () =>
              import('./features/master/components/discount-scheme/discount-scheme.component').then(m => m.DiscountSchemeComponent),
          },
          {
            path: 'manage-items',
            loadComponent: () =>
              import('./features/master/components/product-master/manage-items.component').then(m => m.ManageItemsComponent),
          },
          {
            path: 'manage-discount-scheme',
            loadComponent: () =>
              import('./features/master/components/discount-scheme/manage-discount-scheme.component').then(m => m.ManageDiscountSchemeComponent),
          },
          {
            path: 'industry',
            loadComponent: () =>
              import('./features/master/components/industry/industry.component').then(m => m.IndustryComponent),
          },
          {
            path: 'warehouse',
            loadComponent: () =>
              import('./features/master/components/warehouse/warehouse.component').then(m => m.WarehouseComponent),
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
        children: [
          {
            path: 'add-stock-adjustment',
            loadComponent: () =>
              import('./features/inventory/components/inventory/add-stock-adjustment/add-stock-adjustment.component').then(m => m.AddStockAdjustmentComponent),
          },
          {
            path: 'manage-stock-adjustment',
            loadComponent: () =>
              import('./features/inventory/components/inventory/manage-stock-adjustment/manage-stock-adjustment.component').then(m => m.ManageStockAdjustmentComponent),
          },
          {
            path: 'physical-stock-reconciliation',
            loadComponent: () =>
              import('./features/inventory/components/inventory/physical-stock-reconciliation/physical-stock-reconciliation.component').then(m => m.PhysicalStockReconciliationComponent),
          }
        ]
      },
      
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/components/reports/reports.component').then(m => m.ReportsComponent),
      },
    ],
  },
];
