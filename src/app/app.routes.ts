import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { PriceCatelogComponent } from './features/inventory/components/inventory/add-stock-adjustment/price-catelog.component'; 

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
        children: [
          {
            path: 'invoice',
            loadComponent: () =>
              import('./features/sales/components/sales/invoice/invoice.component').then(m => m.InvoiceComponent),
          },
          {
            path: 'manage-invoice',
            loadComponent: () =>
              import('./features/sales/components/sales/manage-invoice/manage-invoice.component').then(m => m.ManageInvoiceComponent),
          },
          {
            path: 'sale-return',
            loadComponent: () =>
              import('./features/sales/components/sales/sale-return/sale-return.component').then(m => m.SaleReturnComponent),
          },
          {
            path: 'manage-salereturn',
            loadComponent: () =>
              import('./features/sales/components/sales/manage-salereturn/manage-salereturn.component').then(m => m.ManageSaleReturnComponent),
          },
          {
            path: 'quotation',
            loadComponent: () =>
              import('./features/sales/components/sales/quotation/quotation.component').then(m => m.QuotationComponent),
          },
          {
            path: 'manage-quotation',
            loadComponent: () =>
              import('./features/sales/components/sales/manage-quotation/manage-quotation.component').then(m => m.ManageQuotationComponent),
          },
          {
            path: 'deliverynote',
            loadComponent: () =>
              import('./features/sales/components/sales/deliverynote/deliverynote.component').then(m => m.DeliverynoteComponent),
          },
          {
            path: 'manage-deliverynote',
            loadComponent: () =>
              import('./features/sales/components/sales/manage-deliverynote/manage-deliverynote.component').then(m => m.ManageDeliverynoteComponent),
          },
          {
            path: 'proforma-invoice',
            loadComponent: () =>
              import('./features/sales/components/sales/proforma-invoice/proforma-invoice.component').then(m => m.ProformaInvoiceComponent),
          },
          {
            path: 'manage-proforma-invoice',
            loadComponent: () =>
              import('./features/sales/components/sales/manage-proforma-invoice/manage-proforma-invoice.component').then(m => m.ManageProformaInvoiceComponent),
          },
          {
            path: 'saleorder',
            loadComponent: () =>
              import('./features/sales/components/sales/saleorder/saleorder.component').then(m => m.SaleorderComponent),
          },
          {
            path: 'manage-saleorder',
            loadComponent: () =>
              import('./features/sales/components/sales/manage-saleorder/manage-saleorder.component').then(m => m.ManageSaleorderComponent),
          },
          {
            path: 'creditnote',
            loadComponent: () =>
              import('./features/sales/components/sales/creditnote/creditnote.component').then(m => m.CreditnoteComponent),
          },
          {
            path: 'manage-creditnote',
            loadComponent: () =>
              import('./features/sales/components/sales/manage-creditnote/manage-creditnote.component').then(m => m.ManageCreditnoteComponent),
          },
          {
            path: 'debitnote',
            loadComponent: () =>
              import('./features/sales/components/sales/debitnote/debitnote.component').then(m => m.DebitnoteComponent),
          },
          {
            path: 'manage-debitnote',
            loadComponent: () =>
              import('./features/sales/components/sales/manage-debitnote/manage-debitnote.component').then(m => m.ManageDebitnoteComponent),
          }
        ]
      },

      {
        path: 'purchase',
        children: [
            {
              path: 'purchase-bill',
              loadComponent: () =>
                import('./features/purchase/components/purchase/purchase-bill/purchase-bill.component').then(m => m.PurchaseBillComponent),
            },
            {
              path: 'manage-purchase-bill',
              loadComponent: () =>
                import('./features/purchase/components/purchase-manage/manage-purchase-bill/manage-purchase-bill.component').then(m => m.ManagePurchaseBillComponent),
            },
            {
              path: 'purchase-return',
              loadComponent: () =>
                import('./features/purchase/components/purchase/purchase-return/purchase-return.component').then(m => m.PurchaseReturnComponent),
            },
            {
              path: 'manage-purchase-return',
              loadComponent: () =>
                import('./features/purchase/components/purchase-manage/manage-purchase-return/manage-purchase-return.component').then(m => m.ManagePurchaseReturnComponent),
            },
            {
              path: 'purchase-order',
              loadComponent: () =>
                import('./features/purchase/components/purchase/purchase-order/purchase-order.component').then(m => m.PurchaseOrderComponent),
            },
            {
              path: 'manage-purchase-order',
              loadComponent: () =>
                import('./features/purchase/components/purchase-manage/manage-purchase-order/manage-purchase-order.component').then(m => m.ManagePurchaseOrderComponent),
            },
            {
              path: 'creditnote',
              loadComponent: () =>
                import('./features/purchase/components/purchase/creditnote/creditnote.component').then(m => m.CreditnoteComponent),
            },
            {
              path: 'manage-creditnote',
              loadComponent: () =>
                import('./features/purchase/components/purchase-manage/manage-creditnote/manage-creditnote.component').then(m => m.ManageCreditnoteComponent),
            },
            {
              path: 'debitnote',
              loadComponent: () =>
                import('./features/purchase/components/purchase/debitnote/debitnote.component').then(m => m.DebitnoteComponent),
            },
            {
              path: 'manage-debitnote',
              loadComponent: () =>
                import('./features/purchase/components/purchase-manage/manage-debitnote/manage-debitnote.component').then(m => m.ManageDebitnoteComponent),
            },
            {
              path: 'supplier',
              loadComponent: () =>
                import('./features/purchase/components/purchase/supplier/profile/profile.component').then(m => m.ProfileComponent),
            },
            {
              path: 'manage-supplier',
              loadComponent: () =>
                import('./features/purchase/components/purchase-manage/manage-supplier/manage-supplier.component').then(m => m.ManageSupplierComponent),
            }
        ]
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
          },
          {
            path: 'price-catelog',
            component: PriceCatelogComponent, 
          },
        ]
      },
      
      {
        path: 'reports',
        children: [
          {
            path: 'cash-book',
            loadComponent: () =>
              import('./features/reports/components/reports/accounts/cash-book/cash-book.component').then(m => m.CashBookComponent),
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
          },
        ]
      },
    ], 
  },
];
