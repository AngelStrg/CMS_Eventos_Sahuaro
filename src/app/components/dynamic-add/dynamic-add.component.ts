import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { AdditionalServicesService } from '../../services/additional-services.service';

@Component({
  selector: 'app-dynamic-add',
  imports: [AsyncPipe, NgFor],
  templateUrl: './dynamic-add.component.html',
  styleUrl: './dynamic-add.component.css'
})
export class DynamicAddComponent {
  @Input() selectedExtras: string[] = [];
  @Output() selectedExtrasChange = new EventEmitter<string[]>();

  services$: any;

  constructor(private additionalServices: AdditionalServicesService) {
    this.services$ = this.additionalServices.getServices();
  }

  onCheckboxChange(event: Event, service: any) {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    this.selectedExtras = [...this.selectedExtras, service.id];
  } else {
    this.selectedExtras = this.selectedExtras.filter(e => e !== service.id);
  }
  this.selectedExtrasChange.emit(this.selectedExtras);
}

isChecked(service: any): boolean {
  return this.selectedExtras.includes(service.id);
}
}