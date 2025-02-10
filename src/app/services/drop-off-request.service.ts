import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DropOffRequest } from '../models/drop-off-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropOffRequestService {
  private apiUrl = "http://localhost:3000/drop-off-requests"

  constructor(private http: HttpClient) { }


  addDropOffRequest(request: DropOffRequest): Observable<DropOffRequest>{
    return this.http.post<DropOffRequest>(this.apiUrl,request)
  }

  deleteDropOffRequest(id: String): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDropOffRequestsForCollector(): Observable<DropOffRequest[]>{
    return this.http.get<DropOffRequest[]>(`http://localhost:3000/drop-off-requests?status=En%20Attente`)
   

  }

  dropOffRequestOcc(id: String): Observable<DropOffRequest>{
   
    const url = `${this.apiUrl}/${id}`;
    const body = { status: 'Occupée' };     

    console.log("heeeere");
    
    return this.http.patch<DropOffRequest>(url, body);
  }


  
  updateStatusToPending(id: String): Observable<DropOffRequest>{
    const url = `${this.apiUrl}/${id}`;
    const body = { status: 'En cours' };     

    console.log("heeeere");
    
    return this.http.patch<DropOffRequest>(url, body);


  }


  updateStatusToAccept(id: String): Observable<DropOffRequest>{
    const url = `${this.apiUrl}/${id}`;
    const body = { status: 'Validée' };     

    console.log("heeeere");
    
    return this.http.patch<DropOffRequest>(url, body);


  }
}
