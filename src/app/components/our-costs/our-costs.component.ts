import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CostosService } from '../../services/costos.service';
import { Cost } from '../../models/cost.interface';

@Component({
  selector: 'app-our-costs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './our-costs.component.html',
  styleUrls: ['./our-costs.component.css']
})
export class OurCostsComponent implements OnInit {

  formulario!: FormGroup;
  cargando = true;
  private docId?: string;

  constructor(private costService: CostosService) {}

  async ngOnInit() {
    try {
      const { data, docId } = await this.costService.getFirstCost();

      if (!data) throw new Error('No se encontró documento con datos de costos.');

      this.docId = docId;

      this.formulario = new FormGroup({
        p1_with_pool: new FormControl(data.p1_with_pool, Validators.required),
        p1_without_pool: new FormControl(data.p1_without_pool, Validators.required),
        p2_with_pool: new FormControl(data.p2_with_pool, Validators.required),
        p2_without_pool: new FormControl(data.p2_without_pool, Validators.required),
        p3_with_pool: new FormControl(data.p3_with_pool, Validators.required),
        p3_without_pool: new FormControl(data.p3_without_pool, Validators.required),
        p4_with_pool: new FormControl(data.p4_with_pool, Validators.required),
        p4_without_pool: new FormControl(data.p4_without_pool, Validators.required),
        p5_with_pool: new FormControl(data.p5_with_pool, Validators.required),
        p5_without_pool: new FormControl(data.p5_without_pool, Validators.required),
      });

      this.cargando = false;
    } catch (error) {
      console.error('Error cargando datos:', error);
      alert('Error al cargar los costos.');
    }
  }

  async onSubmit() {
    if (!this.docId) {
      alert('Documento no cargado correctamente.');
      return;
    }

    if (this.formulario.valid) {
      try {
        await this.costService.updateFirstCost(this.formulario.value, this.docId);
        alert('✅ Costos actualizados correctamente');
      } catch (error) {
        console.error('❌ Error al actualizar:', error);
        alert('❌ Hubo un error al actualizar los datos.');
      }
    } else {
      alert('⚠️ Verifica que todos los campos estén llenos.');
    }
  }
}
