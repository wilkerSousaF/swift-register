import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private socket: WebSocket;
  private messagesSubject = new Subject<any>(); // Cria um Subject para as mensagens

  constructor() {
    this.connect();
  }

  connect(): void {
    this.socket = new WebSocket('ws://192.168.0.102:3003'); // Substitua pela URL correta do WebSocket

    this.socket.onmessage = (event) => {
      console.log('entrou no websocket', event)
      const data = JSON.parse(event.data);
      this.messagesSubject.next(data); // Emite os dados recebidos para todos os observadores
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  get messages(): Observable<any> {
    return this.messagesSubject.asObservable(); // Retorna o Subject como um Observable
  }

  ngOnDestroy() {
    
    this.socket.close();
  }
}