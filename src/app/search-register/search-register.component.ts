import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    private registerService: RegisterServiceService,
    public router: Router,
  ){}

  ngOnInit(){

  }


  search(){   
    console.log('entrou', this.form.value);
  } 

  addNewRegister() {
    this.router.navigate(['new-register']);
  }



}