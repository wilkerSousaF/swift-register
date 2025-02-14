import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,NgForm, FormControl, Validators} from '@angular/forms';
import { RegisterServiceService } from '../service/register-service.service';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { HttpRegisterService } from '../service/http-register.service';
import { ToastrService } from 'ngx-toastr';
import { WebsocketService } from '../service/websocket.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  @BlockUI('block-ui') blockUI: NgBlockUI;
  counter = 1;
  flatAge: any;
  currentDate = new Date();
  receivedData: any;
  blockSave: boolean = false;
  showPrintError: boolean = false;
  savedRegister: boolean = false;

  form = new FormGroup({
    person_name: new FormControl('', [Validators.required]),
    city: new FormControl(''),
    birthdate: new FormControl(''),
    person_type: new FormControl('MASC'),
    register_date: new FormControl(''),
    zip: new FormControl(''),
    id: new FormControl(''),
    responsible1: new FormControl(''),
    responsible2: new FormControl(''),
    description: new FormControl(''),
    serial_id: new FormControl(''),
  });
  counters: any;
  subscribeWebsocket: Subscription;
  fixedCounter: number;


  constructor(
    private registerService: RegisterServiceService,
    private httpRegisterService: HttpRegisterService,
    public router: Router,
    private toastr: ToastrService,
    private webSocketService: WebsocketService,
  ){
  }

  ngOnInit(){
   this.receivedData = this.registerService.dataReceived;
    this.form.get('register_date')?.setValue(moment().format('DD/MM/YYYY'));
    this.subscribeWebsocket = this.webSocketService.messages.subscribe((newRegister: any) => {
      this.loadCounters();
    });
    
    if(this.receivedData){
      this.loadRegister(this.receivedData);
    }

    this.loadCounters();    

  }

  loadCounters() {
    this.httpRegisterService.getCounters().subscribe({
      next: (data) => {
        this.counters = data;
        this.checkCounter();
        console.log('counters', this.counters)
      },
      error: (error) => {
        console.error('Erro ao carregar contadores:', error);
      }
    });
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

  loadRegister(data: any){
    this.form.patchValue({
      person_name: data.person_name,
      city: data.city,
      birthdate: data.birthdate,
      person_type: data.person_type,
      description: data.description,
      responsible1: data.responsible1,
      serial_id: data.serial_id,
    });
    if(data.birthdate){
      this.calcAge();
    }
  }


  save(){
    
    this.showPrintError = false;
    if(this.form.valid){
      if(!this.form.value.serial_id){
        this.addRegister(this.form.value);
        this.fixedCounterNum();
      } else {
        console.log('entrou');
        this.updateRegister(this.form.value.serial_id, this.form.value);
        this.fixedCounterNum();
      }
  } else {
    this.form.markAllAsTouched();
    this.blockUI.stop(); 
  }
  } 

  fixedCounterNum(){
    this.savedRegister = true;
    this.fixedCounter = this.counter;
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

  calcAge() {
    if (this.form.value.birthdate) {
      const format = "DDMMYYYY";
      const birthDate = moment(this.form.value.birthdate, format, true);
  
      if (birthDate.isValid()) {
        const currentDate = moment();
        this.flatAge = currentDate.diff(birthDate, 'years') + " anos";
        console.log('idade', this.flatAge);
      } else {
        console.log("String de data inválida.");
      }
    } else {
      this.flatAge = null;
    }
  }

  addRegister(newRegister: any) {
    this.blockUI.start();
    this.httpRegisterService.addRegister(newRegister).subscribe(
      response => {
        this.blockSave = true;
        this.toastr.success('Registro salvo com sucesso!');
        console.log('Registro adicionado com sucesso:', response);
        this.blockUI.stop();
      },
      error => {
        console.error('Erro ao adicionar registro:', error);
        this.toastr.error('Falha ao salvar registro!');
        this.blockUI.stop();
      }
    );
  }

  updateRegister(id: string, updatedRegister: any) {
    this.blockUI.start();
    this.httpRegisterService.updateRegister(id, updatedRegister).subscribe({
      next: (response) => {
        this.blockSave = true;
        console.log('Registro atualizado com sucesso:', response);
        this.toastr.success('Registro salvo com sucesso!');
        this.blockUI.stop();
      },
      error: (error) => {
        console.error('Erro ao atualizar registro:', error);
        this.toastr.error('Falha ao salvar registro!');
        this.blockUI.stop();
      }
    });
  }

  checkCounter(){
    console.log('event change', this.form.get('person_type')?.value)
    const selectedType = this.form.get('person_type')?.value ?? 'MASC'; 

    if (this.counters[selectedType] !== undefined) {
      this.counter = this.counters[selectedType]+1;
    } 
  }

}
