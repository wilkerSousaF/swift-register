import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,NgForm, FormControl} from '@angular/forms';
import { RegisterServiceService } from '../service/register-service.service';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';



@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  @BlockUI('block-ui') blockUI: NgBlockUI;
  counter = 1;
  currentDate = new Date();

  form = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    age: new FormControl(''),
    type: new FormControl(''),
    counter: new FormControl(1),
    date: new FormControl(''),
    zip: new FormControl(''),
    id: new FormControl(''),
    responsible1: new FormControl(''),
    responsible2: new FormControl(''),
    description: new FormControl(''),
  });


  constructor(
    private registerService: RegisterServiceService,
  ){}

  ngOnInit(){
    this.form.get('date')?.setValue(moment().format('DD/MM/YYYY'));
    console.log(this.form.get('date')?.value, this.currentDate);
    

  }


  save(){
    this.blockUI.start();
    if(this.form.value.name){
      this.form.get('id')?.setValue(moment().format())
    }
    
    console.log('entrou', this.form.value);
    this.registerService.saveRegister(this.form.value);

    this.incrementCounter();
    setTimeout(() => {
      this.blockUI.stop(); 
    }, 4000);
  } 

  incrementCounter() {
    let today = new Date();
    // if (today.getDate() !== this.currentDate.getDate())
      this.counter++;
    this.form.get('counter')?.setValue(this.counter);
  }

  printScreen() {
    window.print();
  }

}
