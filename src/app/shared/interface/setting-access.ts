import { BaseAccess } from './base-access';

export interface SettingAccess {
  saleAccess?: BaseAccess[];
  purchaseAccess?: BaseAccess[];
  inventoryAccess?: BaseAccess[];
  staffAccess?: BaseAccess[];
  accountAccess?: BaseAccess[];
  reportAccess?: BaseAccess[];
  masterAccess?: BaseAccess[];
  miscAccess?: BaseAccess[];
}
