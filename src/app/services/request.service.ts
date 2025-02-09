import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getUserId } from '../features/auth/state/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:3000'; 
  private store = inject(Store)
  private authUserId!: string ;

  constructor(private http: HttpClient) {
   
  }

  allo(){
    
    
    this.store.pipe(select(getUserId)).subscribe(
      {
        next: data => {
          this.authUserId = data!
          console.log(data)},
        error: error => {
          
          console.error('Error fetching data:', error);
        }
        
      },
      
    )
    
  }


  getUserRequestsWithDropOff(): Observable<any[]> {
    this.allo()

   

  console.log("ok" + this.authUserId)
    const requestsUrl = `${this.baseUrl}/requests?userId=${this.authUserId}`;
    return this.http.get<any[]>(requestsUrl).pipe(
     
      switchMap(requests => {

        const dropOffRequests: Observable<any>[] = [];
        requests.forEach(request => {
          const dropOffUrl = `${this.baseUrl}/drop-off-requests/${request.dropOffRequestId}`;
          dropOffRequests.push(this.http.get(dropOffUrl));
        });

       
        return forkJoin(dropOffRequests).pipe(
          map((dropOffData: any[]) => {
           
            return requests.map((request, index) => {
              return {
                ...request,
                dropOffRequest: dropOffData[index]
              };
            });
          })
        );
      })
    );
  }

}
