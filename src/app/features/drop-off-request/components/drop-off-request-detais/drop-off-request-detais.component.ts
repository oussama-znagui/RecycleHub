import { Component, Input } from '@angular/core';
import { DropOffRequest } from '../../../../models/drop-off-request';

@Component({
  selector: 'app-drop-off-request-detais',
  imports: [],
  templateUrl: './drop-off-request-detais.component.html',
  styleUrl: './drop-off-request-detais.component.css'
})
export class DropOffRequestDetaisComponent {
@Input() request?: DropOffRequest

turnOff(){
  
}
}
