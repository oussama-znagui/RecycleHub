import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthState } from '../features/auth/state/auth.reducer';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../features/auth/state/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private http: HttpClient,private store: Store<AuthState>) { 
    this.user$ = this.store.select(selectAuthState);
  }

  private url = "http://localhost:3000/users"


  login(username:String, password:String): Observable<User | null>{
    return this.http.get<User[]>(this.url).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password)
        return user || null
      })
    )

    
  }

  getUser(): Observable<User> {
    return this.user$;
  }




  deleteUser(id: string): Observable<User>{
    console.log("ddd");
      
      console.log(`${this.url}/${id}`)
      localStorage.clear()
      
       return this.http.delete<User>(`${this.url}/${id}`)
      
        
     
      
  }



}
