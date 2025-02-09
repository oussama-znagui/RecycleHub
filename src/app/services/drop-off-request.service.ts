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
}
