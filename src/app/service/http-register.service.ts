import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class HttpRegisterService {
  // private apiUrl = 'http://192.168.0.102:3000/registers'
  private apiUrl = 'http://localhost:3000/registers'; 

  constructor(private http: HttpClient) { }

  getRegisters(keyword: string, page: number = 1, limit: number = 10): Observable<{ data: Register[], currentPage: number, totalPages: number, totalRegisters: number }> {
    const params = new HttpParams()
    .set('keyword', keyword)
    .set('page', page.toString())
    .set('limit', limit.toString());

  return this.http.get<any>(this.apiUrl, { params });
  }

  getRegistersByBirthdate(birthdate: string, page: number = 1, limit: number = 10): Observable<{ 
    data: Register[], 
    currentPage: number, 
    totalPages: number, 
    totalRegisters: number 
  }> {
    const params = new HttpParams()
      .set('birthdate', birthdate)
      .set('page', page.toString())
      .set('limit', limit.toString());
  
    return this.http.get<any>(`${this.apiUrl}/birthdate`, { params });
  }

  getAllRegisters(page: number = 1, limit: number = 10): Observable<{ data: Register[], currentPage: number, totalPages: number, totalRegisters: number }> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
  
    return this.http.get<any>(this.apiUrl, { params });
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

  getCounters(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/counters`; // URL para o GET request
    return this.http.get<any>(url, { headers });
  }
}
