import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,NgForm, FormControl, Validators} from '@angular/forms';
import { RegisterServiceService } from '../service/register-service.service';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';



@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  @BlockUI('block-ui') blockUI: NgBlockUI;
  counter = 1;
  currentDate = new Date();
  receivedData: any;
  blockSave: boolean = false;
  showPrintError: boolean = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    city: new FormControl(''),
    age: new FormControl(''),
    type: new FormControl('MASC'),
    date: new FormControl(''),
    zip: new FormControl(''),
    id: new FormControl(''),
    responsible1: new FormControl(''),
    responsible2: new FormControl(''),
    description: new FormControl(''),
  });


  constructor(
    private registerService: RegisterServiceService,
    public router: Router,
  ){
  }

  ngOnInit(){
   this.receivedData = this.registerService.dataReceived;
    this.form.get('date')?.setValue(moment().format('DD/MM/YYYY'));

    this.checkCounterDay();
    
    this.counter = this.registerService.counterData;
    
    if(this.receivedData){
      this.loadRegister(this.receivedData);
    }

  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  onlyNumber(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  checkCounterDay(){
    let today = new Date();
    if(today.getDay() > this.currentDate.getDay())
    this.registerService.resetCounter();
  }

  loadRegister(data: any){
    this.form.patchValue({
      name: data.name,
      city: data.city,
      age: data.age,
      type: data.type,
      description: data.description,
      responsible1: data.responsible1,
      id: data.id,
    })
  }


  save(){
    this.blockUI.start();
    this.showPrintError = false;
    if(this.form.valid){
      if(!this.form.value.id){
        this.form.get('id')?.setValue(moment().format());
        this.registerService.saveRegister(this.form.value);
      } else {
        console.log('entrou');
        this.registerService.updateRegister(this.form.value);
      }

      this.incrementCounter();
      setTimeout(() => {
        this.blockSave = this.registerService.saved;
        this.blockUI.stop(); 
      }, 1000);
  } else {
    this.form.markAllAsTouched();
    this.blockUI.stop(); 
  }
  } 

  incrementCounter() {
    let today = new Date();
    if (today.getDate() !== this.currentDate.getDate())
      this.counter++;
  }

  printScreen() {
    if(this.blockSave){
    window.print();
    this.router.navigate(['']);
    this.clear();
  } else {
    this.showPrintError = true;
    setTimeout(() => {
      this.showPrintError = false;
    }, 2000);
  }
  }

  back() {
    this.clear();
    this.router.navigate(['']);
  }

  clear() {
    this.receivedData = null;
    this.form.reset();
    this.registerService.clear();
    this.blockSave = false;
  }

}
