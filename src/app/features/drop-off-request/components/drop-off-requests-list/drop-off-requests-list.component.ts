import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DropOffRequest } from '../../../../models/drop-off-request';
import { select, Store } from '@ngrx/store';
import { getDropOffRequests, getDropOffRequestsError, getDropOffRequestsLoading } from '../../state/drop-off-requests.selectors';
import { deleteDropOffRequest, loadDropOffRequests } from '../../state/drop-off-requests.action';
import { CommonModule } from '@angular/common';
import { DropOffRequestDetaisComponent } from "../drop-off-request-detais/drop-off-request-detais.component";

@Component({
  selector: 'app-drop-off-requests-list',
  imports: [CommonModule, DropOffRequestDetaisComponent],
  templateUrl: './drop-off-requests-list.component.html',
  styleUrl: './drop-off-requests-list.component.css'
})
export class DropOffRequestsListComponent {
  requests?: Observable<DropOffRequest[]>;
  loading?: Observable<boolean>;
  error?: Observable<any>;
  @Output() showDataEvent = new EventEmitter<DropOffRequest>();


  constructor(private store: Store<{dropOffRequests: any}>){
    this.requests = this.store.pipe(select(getDropOffRequests));
    this.loading = this.store.pipe(select(getDropOffRequestsLoading));
    this.error = this.store.pipe(select(getDropOffRequestsError));
  }


  ngOnInit(){
    console.log("rr")
    this.store.dispatch(loadDropOffRequests());
    

  }

  onDeleteRequest(id: String) {
    if (confirm("Voulez-vous vraiment supprimer cette demande ?")) {
      this.store.dispatch(deleteDropOffRequest({ id }));
    }
  }


  showData(request: DropOffRequest){
    console.log(request)
    this.showDataEvent.emit(request)
  }
}
