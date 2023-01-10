import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterServiceService } from '../service/register-service.service';

@Component({
  selector: 'search-register',
  templateUrl: './search-register.component.html',
  styleUrls: ['./search-register.component.css']
})
export class SearchRegisterComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(''),
  });


  constructor(
    private registerService: RegisterServiceService
  ){}

  ngOnInit(){

  }


  search(){   
    console.log('entrou', this.form.value);
  } 

}