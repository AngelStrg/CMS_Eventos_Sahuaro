import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdditionalServicesService } from '../../services/additional-services.service';
import { AdditionalService } from '../../models/additional-service.interface';

@Component({
  selector: 'app-additional-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './additional-services.component.html',
  styleUrls: ['./additional-services.component.css']
})
export class AdditionalServicesComponent implements OnInit {

  formulario!: FormGroup;
  servicios: AdditionalService[] = [];
  cargando = true;

  constructor(private service: AdditionalServicesService) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      id: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
    });

    this.service.getServices().subscribe(data => {
      this.servicios = data;
      this.cargando = false;
    });
  }

  async onSubmit() {
    if (this.formulario.invalid) return;

    const nuevoServicio: AdditionalService = this.formulario.value;
    await this.service.addService(nuevoServicio);
    this.formulario.reset();
  }

  async onDelete(servicio: AdditionalService) {
    await this.service.deleteService(servicio);
  }
}
