import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../models/register.model';
import { RegisterServiceService } from '../service/register-service.service';

@Component({
  selector: 'search-register',
  templateUrl: './search-register.component.html',
  styleUrls: ['./search-register.component.css']
})
export class SearchRegisterComponent implements OnInit {

  @Output() searchedData = new EventEmitter<any>();

  keyword = 'name';
  notFound = 'Nenhum nome encontrado';
  allRegisters: Register[];
  form = new FormGroup({
    name: new FormControl(''),
  });
  filteredRegisters: Register[];
  searchParam: any;


  constructor(
    private registerService: RegisterServiceService,
    public router: Router,
  ){}

  ngOnInit(){
    this.getRegisters();
  }

  async getRegisters(){
    this.allRegisters = await this.registerService.getAllRegister();
    this.filteredRegisters = this.allRegisters;
    console.log('registros', this.allRegisters);
    
  }

  search(){  
    console.log('allRegisters', this.allRegisters);
    
    this.registerService.getRegister();
  } 

  addNewRegister() {
    this.router.navigate(['new-register']);
  }

  selectEvent(event:any){
    this.registerService.searchedData(event);
    this.router.navigate(['new-register']);
  }

  onChangeSearch(search: any){
    console.log('input', search);   

    this.searchParam = search;
 
  }

  newImport(){
    this.router.navigate(['import'])
  }

  newExport() {
    this.router.navigate(['export'])
  }

  searchNameAndAge(registers: any[], query:any ){
    for (const register of registers) {
      register.nameAndAge = `${register.name} ${register.age}`;
    }

    if(query.includes(" ")){
      let separatedQuery =  query.split(" ");      
      return separatedQuery.every((str: string) => {
        registers.filter(register => register.nameAndAge.toLowerCase().includes(str.toLowerCase()))
      }) 
    } else {
      return registers.filter(register => register.nameAndAge.toLowerCase().includes(query.toLowerCase()))
    }
  }

}