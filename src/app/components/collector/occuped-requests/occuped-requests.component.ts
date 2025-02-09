import { Component, EventEmitter, Output } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { AuthState } from '../../../features/auth/state/auth.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DropOffRequest } from '../../../models/drop-off-request';
import { DropOffRequestDetaisComponent } from '../../../features/drop-off-request/components/drop-off-request-detais/drop-off-request-detais.component';

@Component({
  selector: 'app-occuped-requests',
  imports: [DropOffRequestDetaisComponent],
  templateUrl: './occuped-requests.component.html',
  styleUrl: './occuped-requests.component.css'
})
export class OccupedRequestsComponent {
  @Output() closeEvent = new EventEmitter();
  toPendingAllert: boolean = false
  

  userId$: Observable<string | undefined>; 

  requests: DropOffRequest[] = [];

  constructor(private service: RequestService, private store: Store<AuthState>) {
 
    this.userId$ = this.store.select(state => state.user?.id);
  }

  ngOnInit() {

    console.log(this.userId$);
    
    this.service.getUserRequestsWithDropOff().subscribe(
      {
        next: data => {
          
          console.log('Fetched data:', data[0].dropOffRequest);
          data.forEach((d) =>{
            this.requests.push(d.dropOffRequest)
          })
       
        },
        error: error => {
          console.error('Error fetching data:', error);
        }
      }
    );
  }

  toPending(){
    this.closeEvent.emit()
    this.toPendingAllert = true

  }

}
