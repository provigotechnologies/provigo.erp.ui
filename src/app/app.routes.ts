import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component'; // Assuming this is your dashboard
import { PriceCatelogComponent } from './features/inventory/components/inventory/add-stock-adjustment/price-catelog.component'; 
import { LoginComponent } from './auth/login/login.component'; // <-- Import your login component

export const routes: Routes = [
  {
     path: '',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: MainComponent
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
              import('./features/sales/components/sales-manage/manage-invoice/manage-invoice.component').then(m => m.ManageInvoiceComponent),
          },
          {
            path: 'sale-return',
            loadComponent: () =>
              import('./features/sales/components/sales/sale-return/sale-return.component').then(m => m.SaleReturnComponent),
          },
          {
            path: 'manage-salereturn',
            loadComponent: () =>
              import('./features/sales/components/sales-manage/manage-salereturn/manage-salereturn.component').then(m => m.ManageSaleReturnComponent),
          },
          {
            path: 'quotation',
            loadComponent: () =>
              import('./features/sales/components/sales/quotation/quotation.component').then(m => m.QuotationComponent),
          },
          {
            path: 'manage-quotation',
            loadComponent: () =>
              import('./features/sales/components/sales-manage/manage-quotation/manage-quotation.component').then(m => m.ManageQuotationComponent),
          },
          {
            path: 'recurring-invoice',
            loadComponent: () =>
              import('./features/sales/components/sales/recurring-invoice/recurring-invoice.component').then(m => m.RecurringInvoiceComponent),
          },
          {
            path: 'manage-recurring-invoice',
            loadComponent: () =>
              import('./features/sales/components/sales-manage/manage-recurring-invoice/manage-recurring-invoice.component').then(m => m.ManageRecurringInvoiceComponent),
          },
          {
            path: 'deliverynote',
            loadComponent: () =>
              import('./features/sales/components/sales/deliverynote/deliverynote.component').then(m => m.DeliverynoteComponent),
          },
          {
            path: 'manage-deliverynote',
            loadComponent: () =>
              import('./features/sales/components/sales-manage/manage-deliverynote/manage-deliverynote.component').then(m => m.ManageDeliverynoteComponent),
          },
          {
            path: 'proforma-invoice',
            loadComponent: () =>
              import('./features/sales/components/sales/proforma-invoice/proforma-invoice.component').then(m => m.ProformaInvoiceComponent),
          },
          {
            path: 'manage-proforma-invoice',
            loadComponent: () =>
              import('./features/sales/components/sales-manage/manage-proforma-invoice/manage-proforma-invoice.component').then(m => m.ManageProformaInvoiceComponent),
          },
          {
            path: 'saleorder',
            loadComponent: () =>
              import('./features/sales/components/sales/saleorder/saleorder.component').then(m => m.SaleorderComponent),
          },
          {
            path: 'manage-saleorder',
            loadComponent: () =>
              import('./features/sales/components/sales-manage/manage-saleorder/manage-saleorder.component').then(m => m.ManageSaleorderComponent),
          },
          {
            path: 'creditnote',
            loadComponent: () =>
              import('./features/sales/components/sales/creditnote/creditnote.component').then(m => m.CreditnoteComponent),
          },
          {
            path: 'manage-creditnote',
            loadComponent: () =>
              import('./features/sales/components/sales-manage/manage-creditnote/manage-creditnote.component').then(m => m.ManageCreditnoteComponent),
          },
          {
            path: 'debitnote',
            loadComponent: () =>
              import('./features/sales/components/sales/debitnote/debitnote.component').then(m => m.DebitnoteComponent),
          },
          {
            path: 'manage-debitnote',
            loadComponent: () =>
              import('./features/sales/components/sales-manage/manage-debitnote/manage-debitnote.component').then(m => m.ManageDebitnoteComponent),
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
            path: 'accounts',
            children:[
              {
                path: 'cash-book',
                loadComponent: () =>
                import('./features/reports/components/reports/accounts/cash-book/cash-book.component').then(m => m.CashBookComponent),
              },
              {
                path: 'business-book',
                loadComponent: () =>
                  import('./features/reports/components/reports/accounts/business-book/business-book.component').then(m => m.BusinessBookComponent),
              },
              {
                path: 'payment-paid',
                loadComponent: () =>
                  import('./features/reports/components/reports/accounts/payment-paid/payment-paid.component').then(m => m.PaymentPaidComponent),
              },
              {
                path: 'payment-received',
                loadComponent: () =>
                  import('./features/reports/components/reports/accounts/payment-received/payment-received.component').then(m => m.PaymentReceivedComponent),
              },
              {
                path: 'daily-summary',
                loadComponent: () =>
                  import('./features/reports/components/reports/accounts/daily-summary/daily-summary.component').then(m => m.DailySummaryComponent),
              },
              {
                path: 'input-output-tax',
                loadComponent: () =>
                  import('./features/reports/components/reports/accounts/input-output-tax/input-output-tax.component').then(m => m.InputOutputTaxComponent),
              },
              {
                path: 'profit-loss-summary',
                loadComponent: () =>
                  import('./features/reports/components/reports/accounts/profit-loss-summary/profit-loss-summary.component').then(m => m.ProfitLossSummaryComponent),
              },
              {
                path: 'chart-accounts',
                loadComponent: () =>
                  import('./features/reports/components/reports/accounts/chart-accounts/chart-accounts.component').then(m => m.ChartAccountsComponent),
              },
              {
                path: 'balance-sheet',
                loadComponent: () =>
                  import('./features/reports/components/reports/accounts/balance-sheet/balance-sheet.component').then(m => m.BalanceSheetComponent),
              },
            ]
          },
          {
            path: 'inventory',
            children:[
              {
                path: 'item-register',
                loadComponent: () =>
                  import('./features/reports/components/reports/inventory/item-register/item-register.component').then(m => m.ItemRegisterComponent),
              },
              {
                path: 'low-level-stock',
                loadComponent: () =>
                  import('./features/reports/components/reports/inventory/low-level-stock/low-level-stock.component').then(m => m.LowLevelStockComponent),
              },
              {
                path: 'stock-availability',
                loadComponent: () =>
                  import('./features/reports/components/reports/inventory/stock-availability/stock-availability.component').then(m => m.StockAvailabilityComponent),
              },
              {
                path: 'stock-adjustment',
                loadComponent: () =>
                  import('./features/reports/components/reports/inventory/stock-adjustment/stock-adjustment.component').then(m => m.StockAdjustmentComponent),
              },
              {
                path: 'consumable-stock',
                loadComponent: () =>
                  import('./features/reports/components/reports/inventory/consumable-stock/consumable-stock.component').then(m => m.ConsumableStockComponent),
              },
              {
                path: 'fast-moving-items',
                loadComponent: () =>
                  import('./features/reports/components/reports/inventory/fast-moving-items/fast-moving-items.component').then(m => m.FastMovingItemsComponent),
              },
              {
                path: 'items-not-moving',
                loadComponent: () =>
                  import('./features/reports/components/reports/inventory/items-not-moving/items-not-moving.component').then(m => m.ItemsNotMovingComponent),
              },
              {
                path: 'available-serials',
                loadComponent: () =>
                  import('./features/reports/components/reports/inventory/available-serials/available-serials.component').then(m => m.AvailableSerialsComponent),
              },
              {
                path: 'item-list',
                loadComponent: () =>
                  import('./features/reports/components/reports/inventory/item-list/item-list.component').then(m => m.ItemListComponent),
              },
            ]
          },
          {
            path: 'sales',
            children:[
              {
                path: 'sales-aging',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/sales-aging/sales-aging.component').then(m => m.SalesAgingComponent),
              },
              {
                path: 'itemwise-sales',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/itemwise-sales/itemwise-sales.component').then(m => m.ItemwiseSalesComponent),
              },
              {
                path: 'invoicewise-sales',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/invoicewise-sales/invoicewise-sales.component').then(m => m.InvoicewiseSalesComponent),
              },
              {
                path: 'itemwise-profit-margin',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/itemwise-profit-margin/itemwise-profit-margin.component').then(m => m.ItemwiseProfitMarginComponent),
              },
              {
                path: 'invoicewise-profit-margin',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/invoicewise-profit-margin/invoicewise-profit-margin.component').then(m => m.InvoicewiseProfitMarginComponent),
              },
              {
                path: 'customerwise-profit-margin',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/customerwise-profit-margin/customerwise-profit-margin.component').then(m => m.CustomerwiseProfitMarginComponent),
              },
              {
                path: 'itemwise-sales-summary',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/itemwise-sales-summary/itemwise-sales-summary.component').then(m => m.ItemwiseSalesSummaryComponent),
              },
              {
                path: 'invoicewise-sales-summary',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/invoicewise-sales-summary/invoicewise-sales-summary.component').then(m => m.InvoicewiseSalesSummaryComponent),
              },
              {
                path: 'customerwise-sales-summary',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/customerwise-sales-summary/customerwise-sales-summary.component').then(m => m.CustomerwiseSalesSummaryComponent),
              },
              {
                path: 'gst-sales',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/gst-sales/gst-sales.component').then(m => m.GstSalesComponent),
              },
              {
                path: 'active-recurring-invoice',
                loadComponent: () =>
                  import('./features/reports/components/reports/sales/active-recurring-invoice/active-recurring-invoice.component').then(m => m.ActiveRecurringInvoiceComponent),
              },
            ]
          },
          {
            path: 'purchases',
            children:[
              {
                path: 'purchase-aging',
                loadComponent: () =>
                  import('./features/reports/components/reports/purchases/purchase-aging/purchase-aging.component').then(m => m.PurchaseAgingComponent),
              },
              {
                path: 'itemwise-purchase',
                loadComponent: () =>
                  import('./features/reports/components/reports/purchases/itemwise-purchase/itemwise-purchase.component').then(m => m.ItemwisePurchaseComponent),
              },
              {
                path: 'billwise-purchase',
                loadComponent: () =>
                  import('./features/reports/components/reports/purchases/billwise-purchase/billwise-purchase.component').then(m => m.BillwisePurchaseComponent),
              },
              {
                path: 'itemwise-purchase-summary',
                loadComponent: () =>
                  import('./features/reports/components/reports/purchases/itemwise-purchase-summary/itemwise-purchase-summary.component').then(m => m.ItemwisePurchaseSummaryComponent),
              },
              {
                path: 'billwise-purchase-summary',
                loadComponent: () =>
                  import('./features/reports/components/reports/purchases/billwise-purchase-summary/billwise-purchase-summary.component').then(m => m.BillwisePurchaseSummaryComponent),
              },
              {
                path: 'supplierwise-purchase-summary',
                loadComponent: () =>
                  import('./features/reports/components/reports/purchases/supplierwise-purchase-summary/supplierwise-purchase-summary.component').then(m => m.SupplierwisePurchaseSummaryComponent),
              },
              {
                path: 'gst-purchase',
                loadComponent: () =>
                  import('./features/reports/components/reports/purchases/gst-purchase/gst-purchase.component').then(m => m.GstPurchaseComponent),
              },
            ]
          },
          {
            path: 'customers',
            children:[
              {
                path: 'amount-due',
                loadComponent: () =>
                  import('./features/reports/components/reports/customers/amount-due/amount-due.component').then(m => m.AmountDueComponent),
              },
              {
                path: 'payment-history',
                loadComponent: () =>
                  import('./features/reports/components/reports/customers/payment-history/payment-history.component').then(m => m.PaymentHistoryComponent),
              },
              {
                path: 'account-balance',
                loadComponent: () =>
                  import('./features/reports/components/reports/customers/account-balance/account-balance.component').then(m => m.AccountBalanceComponent),
              },
            ]
          },
          {
            path: 'suppliers',
            children:[
              {
                path: 'payment-history',
                loadComponent: () =>
                  import('./features/reports/components/reports/suppliers/payment-history/payment-history.component').then(m => m.PaymentHistoryComponent),
              },
              {
                path: 'account-balance',
                loadComponent: () =>
                  import('./features/reports/components/reports/suppliers/account-balance/account-balance.component').then(m => m.AccountBalanceComponent),
              },
            ]
          },
          {
            path: 'expenses',
            children:[
              {
                path: 'search-expense',
                loadComponent: () =>
                  import('./features/reports/components/reports/expenses/search-expense/search-expense.component').then(m => m.SearchExpenseComponent),
              },
              {
                path: 'search-indirect-expense',
                loadComponent: () =>
                  import('./features/reports/components/reports/expenses/search-indirect-expense/search-indirect-expense.component').then(m => m.SearchIndirectExpenseComponent),
              },
            ]
          },
          {
            path: 'staff',
            children:[
              {
                path: 'search-salary',
                loadComponent: () =>
                  import('./features/reports/components/reports/staff/search-salary/search-salary.component').then(m => m.SearchSalaryComponent),
              },
              {
                path: 'commission',
                loadComponent: () =>
                  import('./features/reports/components/reports/staff/commission/commission.component').then(m => m.CommissionComponent),
              },
              {
                path: 'search-attendance',
                loadComponent: () =>
                  import('./features/reports/components/reports/staff/search-attendance/search-attendance.component').then(m => m.SearchAttendanceComponent),
              },
              {
                path: 'payment-history',
                loadComponent: () =>
                  import('./features/reports/components/reports/staff/payment-history/payment-history.component').then(m => m.PaymentHistoryComponent),
              },
            ]
          },
          {
            path: 'tcs',
            children:[
              {
                path: 'tcs-payable',
                loadComponent: () =>
                  import('./features/reports/components/reports/tcs/tcs-payable/tcs-payable.component').then(m => m.TcsPayableComponent),
              },
              {
                path: 'tcs-receivable',
                loadComponent: () =>
                  import('./features/reports/components/reports/tcs/tcs-receivable/tcs-receivable.component').then(m => m.TcsReceivableComponent),
              },
            ]
          },
          {
            path: 'gstr',
            children:[
              {
                path: 'gstr-1',
                loadComponent: () =>
                  import('./features/reports/components/reports/gstr/gstr-1/gstr-1.component').then(m => m.Gstr1Component),
              },
              {
                path: 'gstr-3',
                loadComponent: () =>
                  import('./features/reports/components/reports/gstr/gstr-3/gstr-3.component').then(m => m.Gstr3Component),
              },
              {
                path: 'gstr-sale',
                loadComponent: () =>
                  import('./features/reports/components/reports/gstr/gstr-sale/gstr-sale.component').then(m => m.GstrSaleComponent),
              },
              {
                path: 'gstr-purchase',
                loadComponent: () =>
                  import('./features/reports/components/reports/gstr/gstr-purchase/gstr-purchase.component').then(m => m.GstrPurchaseComponent),
              },
              {
                path: 'gstr-indirect-expense',
                loadComponent: () =>
                  import('./features/reports/components/reports/gstr/gstr-indirect-expense/gstr-indirect-expense.component').then(m => m.GstrIndirectExpenseComponent),
              },
            ]
          },
        ]
      },
      
      {
         path: 'settings',
         loadComponent: () =>
         import('./features/settings/components/settings/settings/settings.component').then(m => m.SettingsComponent),
         children: [
         {
           path: 'billing',
           loadComponent: () =>
           import('./features/settings/components/settings/billing-settings/billing-settings.component').then(m => m.BillingSettingsComponent),
          },
          {
            path: 'users',
            loadComponent: () =>
            import('./features/settings/components/settings/user-management/user-management.component').then(m => m.UserManagementComponent),
          },
          {
            path: '',
            redirectTo: 'billing',
            pathMatch: 'full'
          }
          ]
        },
       {
          path: 'management-tool',
          loadComponent: () =>
          import('./features/settings/components/settings/user-management/management-tool/management-tool.component').then(m => m.ManagementToolComponent),
          children: [
          {
          path: 'add-user',
          loadComponent: () =>
          import('./features/settings/components/settings/user-management/add-user/add-user.component').then(m => m.AddUserComponent),
          }
       ]
        },
    ], 
  },
];
