import { Injectable } from '@angular/core';
import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

@Injectable({ providedIn: 'root' })
export class LocalDbService {
  private SQL: SqlJsStatic | null = null;
  private db: Database | null = null;

  constructor() {
    this.init();
  }

  async init() {
    this.SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
    });

    const savedDb = localStorage.getItem('InventoryManagementDb');  // Using correct key
    if (savedDb) {
      // Load the database from localStorage if it exists
      this.db = new this.SQL.Database(new Uint8Array(JSON.parse(savedDb)));
      console.log('✅ Database loaded from localStorage');
    } else {
      // Create a new database if not present in localStorage
      this.db = new this.SQL.Database();
      this.createTables();
      console.log('✅ New database created');
    }
  }

  createTables() {
    if (this.db) {
      // Create BankName table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS BankName (
          bankNameId INTEGER PRIMARY KEY AUTOINCREMENT,
          bank TEXT
        );
      `);
      this.saveDB();  // Save the new DB to localStorage
    }
  }

  saveDB() {
    if (this.db) {
      const binaryData = this.db.export();
      localStorage.setItem('InventoryManagementDb', JSON.stringify(Array.from(binaryData)));  // Updated key
      console.log('✅ Database saved to localStorage');
    }
  }

  getDB(): Database | null {
    return this.db;
  }
}
