import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OurServicesService } from '../../services/our-services.service';
import { OurService } from '../../models/our-services';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {

  formulario!: FormGroup;
  servicios: OurService[] = [];

  constructor(private ourServicesService: OurServicesService) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      id: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
    });

    this.ourServicesService.getServices().subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  onSubmit() {
    if (this.formulario.invalid) return;

    const nuevoServicio: OurService = this.formulario.value;
    this.ourServicesService.addService(nuevoServicio).then(() => {
      this.formulario.reset();
    });
  }

  async onClickDelete(servicio: OurService) {
    await this.ourServicesService.deleteService(servicio);
  }
}
