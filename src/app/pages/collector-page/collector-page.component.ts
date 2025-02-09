import { ChangeDetectorRef, Component } from '@angular/core';
import { DropOffRequestDetaisComponent } from "../../features/drop-off-request/components/drop-off-request-detais/drop-off-request-detais.component";
import { DropOffRequestService } from '../../services/drop-off-request.service';
import { DropOffRequest } from '../../models/drop-off-request';
import { CollectionRequestSuccessfulComponent } from "../../components/collector/collection-request-successful/collection-request-successful.component";
import { OccupedRequestsComponent } from "../../components/collector/occuped-requests/occuped-requests.component";

@Component({
  selector: 'app-collector-page',
  imports: [DropOffRequestDetaisComponent, CollectionRequestSuccessfulComponent, OccupedRequestsComponent],
  templateUrl: './collector-page.component.html',
  styleUrl: './collector-page.component.css'
})
export class CollectorPageComponent {
  requests: DropOffRequest[] = [];
  reqSucc: boolean = false;
  viewOccuReq: boolean = false;

  constructor(private service: DropOffRequestService,private cdr: ChangeDetectorRef){

  }

  viewOccupedRequests(){
    this.viewOccuReq = true;
  }

  hideOccupedRequests(){
    this.viewOccuReq = false;
  }

  ngOnInit(): void {
    this.loadDropOffRequests();
    
  }

loadDropOffRequests(): void {
  this.service.getDropOffRequestsForCollector().subscribe(
   {
    next:  (requests: DropOffRequest[]) => {
      this.requests = requests;
    },
    error: (error) => {
      console.error('Erreur lors du chargement des requêtes : ', error);
    }
   
   }
  );
}

collect(id: String){
  console.log("allo")

  this.service.dropOffRequestOcc(id).subscribe({
    next: (updatedRequest: DropOffRequest) => {   
      this.reqSucc = true;
  
      setTimeout(() => {
        this.reqSucc = false;
      }, 10000000);
    },
    error: (error) => {
      console.error('Erreur lors de la mise à jour du statut : ', error);
    }
  });

}


markAsOccupied(id: String) {

    this.service.dropOffRequestOcc(id).subscribe({
      next: (updatedRequest) => {
        this.requests = this.requests.filter(r => r.id !== updatedRequest.id);
        this.reqSucc = true;


        setTimeout(() => {
          this.reqSucc = false;
        } , 1000000)
      },
      error: (error) => console.error('Error marking request as occupied:', error)
    });
  
}

}


