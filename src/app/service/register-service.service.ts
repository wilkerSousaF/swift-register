import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  private db!: Dexie;
 
 private table: Dexie.Table<any, any>;
    
  

  constructor() {
    this.initializateDb();
   }

   private initializateDb(){
    this.db = new Dexie('db-register');
    this.db.version(1).stores({
      register: 'id'
    });
    this.table = this.db.table('register');
   }

   async saveRegister(register: any){
    console.log('entrou no service', register);
    
    try {
      await this.table.add(register);
      const allRegisters: Register[] = await this.table.toArray();
      console.log('todos os registros', allRegisters);
    } catch (error) {
      console.log('Falhou!', error);
    }
      

   }
}
