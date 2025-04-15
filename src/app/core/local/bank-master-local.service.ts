import { Injectable } from '@angular/core';
import { LocalDbService } from './local-db.service';

export interface BankMaster {
  id?: number;
  name: string;
  code: string;
  status: number;
}

@Injectable({ providedIn: 'root' })
export class BankMasterLocalService {
  constructor(private localDb: LocalDbService) {}

  addBank(bank: BankMaster) {
    const db = this.localDb.getDB();
    if (db) {
      db.run(`INSERT INTO BankMaster (name, code, status) VALUES (?, ?, ?);`, [
        bank.name,
        bank.code,
        bank.status,
      ]);
      this.localDb.saveDB();  // Save DB after modification
    }
  }

  updateBank(bank: BankMaster) {
    const db = this.localDb.getDB();
    if (db && bank.id !== undefined) {
      db.run(`UPDATE BankMaster SET name = ?, code = ?, status = ? WHERE id = ?;`, [
        bank.name,
        bank.code,
        bank.status,
        bank.id,
      ]);
      this.localDb.saveDB();  // Save DB after modification
    }
  }

  deleteBank(id: number) {
    const db = this.localDb.getDB();
    if (db) {
      db.run(`DELETE FROM BankMaster WHERE id = ?;`, [id]);
      this.localDb.saveDB();  // Save DB after modification
    }
  }

  getAllBanks(): BankMaster[] {
    const db = this.localDb.getDB();
    if (db) {
      const result = db.exec(`SELECT * FROM BankMaster;`);
      if (result.length > 0) {
        const cols = result[0].columns;
        return result[0].values.map(row =>
          row.reduce((obj: any, val, i) => {
            obj[cols[i]] = val;
            return obj;
          }, {})
        );
      }
    }
    return [];
  }
}
