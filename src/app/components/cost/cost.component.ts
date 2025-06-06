import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class CostComponent {
   isEditing = false; //Controla si los inputs están activos
  services = [
    { id: 1, name: '5 a 25', priceWithPool: 4400, priceWithoutPool: 3900 },
    { id: 2, name: '26 a 50', priceWithPool: 5400, priceWithoutPool: 4900 },
    { id: 3, name: '51 a 80', priceWithPool: 5900, priceWithoutPool: 5400 },
    { id: 4, name: '81 a 100', priceWithPool: 6900, priceWithoutPool: 6400 },
    { id: 5, name: '101 a 150', priceWithPool: 7900, priceWithoutPool: 7400 }
  ];

  private backupServices: any[] = [];

  toggleEdit() {
    if (!this.isEditing) {
      // Activar edición: guardar copia de seguridad
      this.backupServices = JSON.parse(JSON.stringify(this.services));
      this.isEditing = true;
    } else {
      // Cancelar edición: restaurar copia
      this.services = JSON.parse(JSON.stringify(this.backupServices));
      this.isEditing = false;
    }
  }

  savePrices() {
    console.log('Precios actualizados:', this.services);
    this.backupServices = [];
    this.isEditing = false;
  }
}

