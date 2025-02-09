import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as DropOffRequestsActions from '../../state/drop-off-requests.action';
import { DropOffRequest } from '../../../../models/drop-off-request';
@Component({
  selector: 'app-add-drop-off-request',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-drop-off-request.component.html',
  styleUrl: './add-drop-off-request.component.css'
})
export class AddDropOffRequestComponent {

   @Output() closeEvent = new EventEmitter();
   typesDeDechetOptions: string[] = ['Plastique', 'Métal', 'Papier', 'Verre', 'Électronique'];

   form: FormGroup;


   constructor(private fb: FormBuilder, private store: Store){
    this.form = this.fb.group({
      dechets: this.fb.array([]),
      adresse_de_collecte: ['', Validators.required],
      date_creneau: ['', [Validators.required, this.validateHour]],
      notes_supplementaires: [''],
      id_ville: [null, Validators.required],
      status: ["En Attente"]
    })
   }

   get dechets() {
    return this.form.get('dechets') as FormArray;
  }

  addDechet() {
    this.dechets.push(
      this.fb.group({
        type_de_dechet: ['', Validators.required],
        poids_estime: [null, Validators.min(1000)]
      })
    );
  }

  removeDechet(index: number) {
    this.dechets.removeAt(index);
  }


   onSubmit() {
    console.log()
    let total = 0
    for (let index = 0; index < this.form.value.dechets.length; index++) {
       total += this.form.value.dechets[index].poids_estime;
      
    }
    if(total > 1000){
      alert('f.');
      return
    }

    if (this.form.valid ) {
      const request: DropOffRequest = {
       
        ...this.form.value,
        id_particulier: undefined 
      };
  
      this.store.dispatch(DropOffRequestsActions.addDropOffRequest({ request }));
  
      this.closeEvent.emit();
    } else {
      alert('Veuillez remplir correctement le formulaire.');
    }
  }



   validateHour(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return { required: true }; 
    const date = new Date(control.value);
    const hours = date.getHours();

    if (hours < 9 || hours >= 18) {
      return { workingHours: true }; 
    }

    return null; 
  }


   close(){
    this.closeEvent.emit()
   }

   



}
