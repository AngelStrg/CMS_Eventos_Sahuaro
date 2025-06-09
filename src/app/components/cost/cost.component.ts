import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { CostosService } from '../../services/costos.service';
import { Cost } from '../../models/cost.interface';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NavBarComponent],
  standalone: true
})
export class CostComponent {

  formulario: FormGroup;

  constructor(private costService: CostosService){

this.formulario = new FormGroup({
  p1_with_pool: new FormControl(0),
  p1_without_pool: new FormControl(0),

  p2_with_pool: new FormControl(0),
  p2_without_pool: new FormControl(0),

  p3_with_pool: new FormControl(0),
  p3_without_pool: new FormControl(0),

  p4_with_pool: new FormControl(0),
  p4_without_pool: new FormControl(0),

  p5_with_pool: new FormControl(0),
  p5_without_pool: new FormControl(0),
});
  }

  ngOninit(): void{

  }

    async onSubmit(){
      console.log(this.formulario.value);
    const response = await this.costService.AddCost(this.formulario.value);
    console.log(response);
    console.log('🟡 Enviando formulario...');
    console.log(this.formulario.value);
    }

  }




