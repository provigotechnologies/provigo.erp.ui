export interface BaseAccess {
  id: number;                 
  userId: number;
  settingId: number;         
  view: boolean;
  add: boolean;
  modify: boolean;
  delete: boolean;
  createdAt: string;
  lastUpdatedAt: string;
}
