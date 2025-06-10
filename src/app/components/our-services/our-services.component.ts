import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OurServicesService } from '../../services/our-services.service';
import { OurServices } from '../../models/our-services';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent],
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {

  formulario!: FormGroup;
  servicios: OurServices[] = [];

  constructor(private ourServices: OurServicesService) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      id: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
    });

    this.ourServices.getServices().subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  onSubmit() {
    if (this.formulario.invalid) return;

    const nuevoServicio: OurServices = this.formulario.value;
    this.ourServices.addService(nuevoServicio).then(() => {
      this.formulario.reset();
    });
  }

  async onDelete(servicio: OurServices) {
      await this.ourServices.deleteService(servicio);
    }
}
