import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  stock: { nombre: string, cantidad: number }[] = [
    { nombre: 'sillas', cantidad: 120 },
    { nombre: 'mesas', cantidad: 15 },
    { nombre: 'colores de mantel', cantidad: 10 },
    { nombre: 'cama elástica', cantidad: 1 },
    { nombre: 'inflables', cantidad: 2 },
    { nombre: 'palomera', cantidad: 1 },
    { nombre: 'carreta para mesa de dulces', cantidad: 1 },
    { nombre: 'mesa para pastel', cantidad: 1 }
  ];

  nuevoItem = { nombre: '', cantidad: 1 };

  agregarItem() {
    if (this.nuevoItem.nombre.trim() && this.nuevoItem.cantidad > 0) {
      this.stock.push({ ...this.nuevoItem });
      this.nuevoItem = { nombre: '', cantidad: 1 };
    }
  }

  eliminarItem(index: number) {
    this.stock.splice(index, 1);
  }

  guardarCambios() {
    console.log('Stock actualizado:', this.stock);
    alert('Cambios guardados');
  }
}

