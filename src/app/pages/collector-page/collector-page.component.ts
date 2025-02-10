import { ChangeDetectorRef, Component } from '@angular/core';
import { DropOffRequestDetaisComponent } from "../../features/drop-off-request/components/drop-off-request-detais/drop-off-request-detais.component";
import { DropOffRequestService } from '../../services/drop-off-request.service';
import { DropOffRequest } from '../../models/drop-off-request';
import { CollectionRequestSuccessfulComponent } from "../../components/collector/collection-request-successful/collection-request-successful.component";
import { OccupedRequestsComponent } from "../../components/collector/occuped-requests/occuped-requests.component";
import { AlertComponent } from '../../components/collector/alert/alert.component';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-collector-page',
  imports: [DropOffRequestDetaisComponent, CollectionRequestSuccessfulComponent, OccupedRequestsComponent, AlertComponent],
  templateUrl: './collector-page.component.html',
  styleUrl: './collector-page.component.css'
})
export class CollectorPageComponent {
  requests: DropOffRequest[] = [];
  reqSucc: boolean = false;
  viewOccuReq: boolean = false;
  alert: boolean = false
  alertMessage: string = "";
  currnetAction: String = "";
  currentRequestIdActions: String = ""

  constructor(private requestService: RequestService,private service: DropOffRequestService,private cdr: ChangeDetectorRef){

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
      console.log("allo" + requests);
      
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
    this.requestService.addRequest(id).subscribe({
      next: (request) =>{
        console.log(request);
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
    })
    
  
}


alertToUpdateRequestToPending(data: { id: String; action: String; }){

  this.currentRequestIdActions = data.id
  
  this.alert = true
  console.log();
  this.currnetAction = data.action
  console.log(data.action);
  
 switch (data.action) {
  case "accept":
     this.alertMessage = "Etes vous sur de confirmer cette demande"
    break;
  case "pending":
    this.alertMessage = "Etes vous chez le particulier"
    break
  default:
    break;
 }
 
  
  
}

alertNo(){
  this.alert = false
  this .alertMessage = ""
  this.currnetAction = ""
  this.currentRequestIdActions = ""
}

alertYes(){
  console.log(this.currnetAction);
  
  switch (this.currnetAction) {
    case "pending":
      this.updateStatusToPending(this.currentRequestIdActions)
      break
    case "accept":
      console.log("accept");
      this.updateToStatusAccept(this.currentRequestIdActions)
      
      
      
      
      break;
  
    default:
      break;
  }
}

updateStatusToPending(id :String){
  this.alertNo()
  this.service.updateStatusToPending(id).subscribe()
}

updateToStatusAccept(id: String){
  this.alertNo()
  this.service.updateStatusToAccept(id).subscribe()
}
}


