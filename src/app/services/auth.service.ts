import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:3000/users"


  login(username:String, password:String): Observable<User | null>{
    return this.http.get<User[]>(this.url).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password)
        return user || null
      })
    )
  }
}
