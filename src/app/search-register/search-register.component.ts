import { Component, OnInit } from '@angular/core';
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

  keyword = 'name';
  allRegisters: Register[];
  form = new FormGroup({
    name: new FormControl(''),
  });


  constructor(
    private registerService: RegisterServiceService,
    public router: Router,
  ){}

  ngOnInit(){
    this.getRegisters();
  }

  async getRegisters(){
    this.allRegisters = await this.registerService.getAllRegister();
    console.log('registros', this.allRegisters);
    
  }

  search(){   
    this.registerService.getRegister();
  } 

  addNewRegister() {
    this.router.navigate(['new-register']);
  }

  selectEvent(event:any){
    console.log(event);

  }


}