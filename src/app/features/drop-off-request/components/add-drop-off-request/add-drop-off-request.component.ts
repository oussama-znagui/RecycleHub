import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-drop-off-request',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-drop-off-request.component.html',
  styleUrl: './add-drop-off-request.component.css'
})
export class AddDropOffRequestComponent {

   @Output() closeEvent = new EventEmitter();

   form: FormGroup;


   constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      poids_estime: ['', [Validators.required, Validators.min(1000)]],
      adresse_de_collecte: ['',[Validators.required]],
      ville: ['', Validators.required],
      date_creneau: ['', [Validators.required, this.validateHour]],
    })
   }


   onSubmit(){
    console.log("allo")
    if (this.form.valid) {
      alert('Formulaire envoyé avec succès ! 🎉');
      console.log(this.form.value);
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
