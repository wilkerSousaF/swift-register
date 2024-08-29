import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRegisterService {
  private apiUrl = 'http://192.168.3.100:3000/registers'; // URL da API Node.js

  constructor(private http: HttpClient) { }

  getRegisters(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addRegister(register: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl, register, { headers });
  }

  updateRegister(id: any, register: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${id}`; // URL para o PUT request
    return this.http.put<any>(url, register, { headers });
  }
}
