import { Injectable } from '@angular/core';
import { LocalDbService } from './local-db.service';

export interface BankName {
  bankNameId?: number;
  bank: string;
}

@Injectable({
  providedIn: 'root'
})
export class BanknameLocalService {
  constructor(private localDb: LocalDbService) {}

  // Add Bank Name after ensuring database is initialized
  async addBankName(bankName: BankName) {
    await this.localDb.init();  // Wait until the DB is initialized
    const db = this.localDb.getDB();
    
    if (db) {
      db.run(`INSERT INTO BankName (bank) VALUES (?);`, [bankName.bank]);
      console.log('✅ INSERTED:', bankName.bank);
      this.localDb.saveDB();
    } else {
      console.error('❌ DB is not ready');
    }
  }

  updateBankName(bankName: BankName) {
    const db = this.localDb.getDB();
    if (db && bankName.bankNameId !== undefined) {
      db.run(`
        UPDATE BankName SET bank = ? WHERE bankNameId = ?;
      `, [bankName.bank, bankName.bankNameId]);
      this.localDb.saveDB();  // Save DB after modification
    }
  }

  deleteBankName(bankNameId: number) {
    const db = this.localDb.getDB();
    if (db) {
      db.run(`DELETE FROM BankName WHERE bankNameId = ?;`, [bankNameId]);
      this.localDb.saveDB();  // Save DB after modification
    }
  }

  getAllBankNames(): BankName[] {
    const db = this.localDb.getDB();
    if (db) {
      const result = db.exec(`SELECT * FROM BankName;`);
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
