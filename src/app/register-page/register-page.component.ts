import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,NgForm, FormControl} from '@angular/forms';
import { RegisterServiceService } from '../service/register-service.service';


@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    age: new FormControl(''),
    type: new FormControl(''),
    date: new FormControl(''),
    zip: new FormControl(''),
    id: new FormControl(''),
    responsible1: new FormControl(''),
    responsible2: new FormControl(''),
    description: new FormControl(''),
  });


  constructor(
    private registerService: RegisterServiceService
  ){}

  ngOnInit(){

  }


  save(){
    if(this.form.value.name){
      this.form.get('id')?.setValue(this.form.value.name)
    }
    
    console.log('entrou', this.form.value);
    this.registerService.saveRegister(this.form.value);
  } 

}
