import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../models/register.model';
import { RegisterServiceService } from '../service/register-service.service';
import { HttpRegisterService } from '../service/http-register.service';
import { WebsocketService } from '../service/websocket.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'search-register',
  templateUrl: './search-register.component.html',
  styleUrls: ['./search-register.component.css']
})
export class SearchRegisterComponent implements OnInit, OnDestroy {

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
  limit = 10;
  page = 1;
  searchKeyword: any;
  birthdateKeyword: string = '';
  birthdateInput: any;



  constructor(
    private registerService: RegisterServiceService,
    public router: Router,
    private httpRegisterService: HttpRegisterService,
    private webSocketService: WebsocketService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadRegisters();
    this.subscribeWebsocket = this.webSocketService.messages.subscribe((newRegister: any) => {
      this.handleNewRegister(newRegister);
    });

  }

  onFocused() {
    this.birthdateInput = '';
    this.loadingComplete = true;
  }

  clearLoading() {
    this.loadingComplete = false;
    this.loadRegisters();
  }

  loadRegisters(): void { 
    this.httpRegisterService.getAllRegisters().subscribe({
      next: (data) => {
        console.log('data', data)
        this.allRegisters = data.data;
        this.allRegisters.map(item => (
          item.nameAndAge = `${item.person_name} - ${this.formatDate(item.birthdate)}`
        ));
        this.tableRegisters = this.allRegisters.slice(0, 4);

      },
      error: (error) => {
        this.toastr.error('Erro ao carregar registros. Aguarde alguns segundos, então reinicie a aplicação');
      }
    });
  }

  onSearchChange(searchValue?: string, page?: number, searchEnded?: boolean): void {
    this.page = page ? page : 1;
    this.searchKeyword = searchValue ? searchValue : this.searchKeyword;
    this.loadingComplete = true;

    this.httpRegisterService.getRegisters(this.searchKeyword, this.page, this.limit).subscribe({
      next: (response) => {
        if (searchEnded) {
          this.allRegisters = [...this.allRegisters, ...response.data];
        } else {

          this.allRegisters = response.data;
        }

        this.allRegisters = this.allRegisters.map(item => ({
          ...item,
          nameAndAge: `${item.person_name} - ${this.formatDate(item.birthdate)}`
        }));

        this.loadingComplete = false;
        console.log('Data on search:', response, this.allRegisters);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.toastr.error('Nenhum registro com esse nome encontrado');
        this.loadRegisters();
      }
    });
  }

  onBirthdateSearchChange(event: any): void {
    const birthdate = event.replace(/\//g, '');

    if (birthdate) {
      this.loadingComplete = true;

      this.httpRegisterService.getRegistersByBirthdate(birthdate).subscribe({
        next: (response) => {
          this.allRegisters = response.data.map(item => ({
            ...item,
            nameAndAge: `${item.person_name} - ${this.formatDate(item.birthdate)}`
          }));
          this.loadingComplete = false;

          this.autoComplete.open();
        },
        error: (error) => {
          console.error('Erro ao buscar por data de aniversário:', error);
          this.toastr.error('Nenhum registro encontrado para essa data.');
          this.loadingComplete = false;
        },
      });
    }
  }


  searchEnded() {
    this.page++;
    this.onSearchChange(this.searchKeyword, this.page, true);
  }

  handleNewRegister(newRegister: any): void {
    this.loadRegisters();
  }


  addNewRegister() {
    this.router.navigate(['new-register']);
  }

  selectEvent(event: any) {
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
    }  
    return inputDate;  
  }

  normalizeString(input: any): string {
    return input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  selectRow(register: any) {
    console.log('register event', register)
  }

  ngOnDestroy() {
    this.subscribeWebsocket.unsubscribe();
  }

}