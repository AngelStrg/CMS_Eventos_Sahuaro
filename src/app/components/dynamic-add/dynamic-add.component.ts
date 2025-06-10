import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common'; // <-- Agrega esto
import { AdditionalServicesService } from '../../services/additional-services.service';

@Component({
  selector: 'app-dynamic-add',
  imports: [AsyncPipe, NgFor], // <-- Agrega AsyncPipe y NgFor aquí
  templateUrl: './dynamic-add.component.html',
  styleUrl: './dynamic-add.component.css'
})
export class DynamicAddComponent {
  services$: ReturnType<AdditionalServicesService['getServices']>;

  constructor(private additionalServices: AdditionalServicesService) {
    this.services$ = this.additionalServices.getServices();
  }
}