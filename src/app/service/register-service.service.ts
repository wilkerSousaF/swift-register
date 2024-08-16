import { Injectable } from '@angular/core';
import Dexie, { liveQuery } from 'dexie';
import { ToastrService } from 'ngx-toastr';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  dataReceived: any;
  private db!: Dexie;
 
 private table: Dexie.Table<any, any>;
  saved: boolean = false;
//  allRegister$ = liveQuery(() => this.registerList());
    
  

  constructor(
    private toastr: ToastrService
  ) {
    this.initializateDb();
    this.persist();
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
      this.toastr.success('Registro salvo com sucesso!');
      this.saved = true;
    } catch (error) {
      this.toastr.error('Falha ao salvar registro!');
    }
   }

   async getRegister(){
    const allRegisters: Register[] = await this.table.toArray();
    allRegisters.forEach(register =>{
      if(register.name?.includes("asdf"))
      console.log(register);
    })
   }

   async getAllRegister(){
    const allRegisters: Register[] = await this.table.orderBy('id').reverse().toArray();
    return allRegisters;
    
   }

   async registerList() {
    return await this.table.get({name:"asdf"})
   }

   async searchedData(data: any){
    this.dataReceived = data;
   }

   clear(){
    this.dataReceived = null;
    this.saved = false;
   }

   updateRegister(register: any){
    this.table.put(register).then( () => {
      this.toastr.success('Registro atualizado com sucesso!');
      this.saved = true;
    }).catch(err => {
      this.toastr.error('Falha ao salvar registro!');
    });
   }


   setButtonSaveRelease(){
    this.saved = false;
   }


   async persist() {
    return await navigator.storage && navigator.storage.persist &&
      navigator.storage.persist();
  }

  exportDatabase() {
    this.table.toArray().then(data => {
      const json = JSON.stringify(data);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'DBregisters.json';
      link.click();
    });
  }

  importDatabase(fileInputEvent: Event) {
    const file = (fileInputEvent.target as HTMLInputElement).files?.[0];
    if (!file) {
      this.toastr.error('Nenhum arquivo selecionado');
        return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
        const json = event.target?.result as string;
        const data = JSON.parse(json);

        try {
            await this.table.bulkPut(data);
            this.toastr.success('Importação completada!');
        } catch (error) {
            console.error('Erro na importação:', error);
            this.toastr.error('Erro na importação')
        }
    };

    reader.readAsText(file);
}
}
