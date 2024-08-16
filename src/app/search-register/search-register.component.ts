import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../models/register.model';
import { RegisterServiceService } from '../service/register-service.service';
import * as moment from 'moment';

@Component({
  selector: 'search-register',
  templateUrl: './search-register.component.html',
  styleUrls: ['./search-register.component.css']
})
export class SearchRegisterComponent implements OnInit {

  @Output() searchedData = new EventEmitter<any>();

  keyword = 'nameAndAge';
  notFound = 'Nenhum nome encontrado';
  allRegisters: Register[];
  form = new FormGroup({
    name: new FormControl(''),
  });
  tableRegisters: Register[];
  showImportInput: boolean = false;


  constructor(
    private registerService: RegisterServiceService,
    public router: Router,
  ){}

  ngOnInit(){
    this.getRegisters();
  }

  async getRegisters(){
    this.allRegisters = await this.registerService.getAllRegister();
    this.allRegisters.map(item => (
      item.nameAndAge = `${this.normalizeString(item.name)} - ${this.formatDate(item.age)}`
    ));
    
    this.tableRegisters = this.allRegisters.slice(0, 4);
    console.log('registros', this.tableRegisters);
  }

  search(){   
    this.registerService.getRegister();
  } 

  addNewRegister() {
    this.router.navigate(['new-register']);
  }

  selectEvent(event:any){
    console.log('event', event)
    this.registerService.searchedData(event);
    this.router.navigate(['new-register']);
  }

  exportFunction() {
    this.registerService.exportDatabase();
  }

  importFunction(file: any){
    this.registerService.importDatabase(file);
  }

  formatDate(inputDate: any) {
    if (inputDate && inputDate.length === 8) {
      const day = inputDate.substring(0, 2);
      const month = inputDate.substring(2, 4);
      const year = inputDate.substring(4, 8);
      
      const formattedDate = `${day}/${month}/${year}`;
      
      return formattedDate;
    } else {
      return inputDate; // Caso a data não esteja no formato esperado
    }
  }

  normalizeString(input: any): string {
    return input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  selectRow(register: any){
    console.log('register event', register)
  }

  showImport(){
    this.showImportInput = !this.showImportInput;
  }


}