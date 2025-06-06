import { Component, OnInit } from '@angular/core';
import { Cost } from '../../models/cost.interface';
import { CostosService } from '../../services/costos.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-our-costs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './our-costs.component.html',
  styleUrl: './our-costs.component.css'
})
export class OurCostsComponent implements OnInit {


  formulario!: FormGroup;

  constructor(
    private costService: CostosService
  ){
    
  }
  async ngOnInit() {
    const { data } = await this.costService.getFirstCost();

    this.formulario = new FormGroup({
      p1_with_pool: new FormControl(data.p1_with_pool),
      p1_without_pool: new FormControl(data.p1_without_pool),
      p2_with_pool: new FormControl(data.p2_with_pool),
      p2_without_pool: new FormControl(data.p2_without_pool),
      p3_with_pool: new FormControl(data.p3_with_pool),
      p3_without_pool: new FormControl(data.p3_without_pool),
      p4_with_pool: new FormControl(data.p4_with_pool),
      p4_without_pool: new FormControl(data.p4_without_pool),
      p5_with_pool: new FormControl(data.p5_with_pool),
      p5_without_pool: new FormControl(data.p5_without_pool),
    });
  }

  async onSubmit() {
    if (this.formulario.valid) {
      try {
        await this.costService.updateFirstCost(this.formulario.value);
        console.log('✅ Costos actualizados correctamente');
      } catch (error) {
        console.error('❌ Error al actualizar:', error);
      }
    }
  }

}
