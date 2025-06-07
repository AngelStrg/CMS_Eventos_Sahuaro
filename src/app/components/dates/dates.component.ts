import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatesService } from '../../services/dates.service';

@Component({
  selector: 'app-dates',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent {

  formulario: FormGroup;

  constructor(
    private datesService: DatesService
  ){
    this.formulario = new FormGroup({
      event: new FormControl(),
      date: new FormControl(),
      hour: new FormControl (),
      client: new FormControl (),
      status: new FormControl()
    })
  }

  ngOninit(): void{

  }


}
