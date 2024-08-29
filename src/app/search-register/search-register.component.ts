import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../models/register.model';
import { RegisterServiceService } from '../service/register-service.service';
import * as moment from 'moment';
import { HttpRegisterService } from '../service/http-register.service';
import { WebsocketService } from '../service/websocket.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'search-register',
  templateUrl: './search-register.component.html',
  styleUrls: ['./search-register.component.css']
})
export class SearchRegisterComponent implements OnInit, OnDestroy  {

  @Output() searchedData = new EventEmitter<any>();

  @ViewChild('autoComplete') autoComplete: any;

  keyword = 'nameAndAge';
  notFound = 'Nenhum nome encontrado';
  allRegisters: Register[];
  form = new FormGroup({
    person_name: new FormControl(''),
  });
  tableRegisters: Register[];
  showImportInput: boolean = false;
  loadingComplete: boolean = false;
  subscribeWebsocket: Subscription;



  constructor(
    private registerService: RegisterServiceService,
    public router: Router,
    private httpRegisterService: HttpRegisterService,
    private webSocketService: WebsocketService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.loadRegisters();
    this.subscribeWebsocket = this.webSocketService.messages.subscribe((newRegister:any) => {
      this.handleNewRegister(newRegister);
    });

  }

  onFocused(){
    this.loadingComplete = true;
    console.log('entrou no focus');
    // do something when input is focused
  }

  clearLoading(){
    console.log('entrou no closed');
    this.loadingComplete = false;
  }

  loadRegisters(): void { // A função deve ser do tipo void
   
    this.httpRegisterService.getRegisters().subscribe({
      next: (data) => {
        this.allRegisters = data;
        this.allRegisters.map(item => (
          item.nameAndAge = `${this.normalizeString(item.person_name)} - ${this.formatDate(item.birthdate)}`
        ));
        this.tableRegisters = this.allRegisters.slice(0, 4);
       
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar registros. Aguarde alguns segundos, então reinicie a aplicação');
      }
    });
  }


  handleNewRegister(newRegister: any): void {
    console.log('fn na search', newRegister);
    this.loadRegisters();
  }


  addNewRegister() {
    this.router.navigate(['new-register']);
  }

  selectEvent(event:any){
    console.log('event', event)
    this.registerService.searchedData(event);
    this.router.navigate(['new-register']);
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

  ngOnDestroy() {
    this.subscribeWebsocket.unsubscribe();
  }

}