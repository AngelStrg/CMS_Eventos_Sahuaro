import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  price: number;
  editing: boolean;
}

@Component({
  selector: 'app-cost',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cost.component.html',
  styleUrl: './cost.component.css'
})
export class CostComponent {
  products: Product[] = [
    { name: 'Producto A', price: 100, editing: false },
    { name: 'Producto B', price: 200, editing: false },
    { name: 'Producto C', price: 300, editing: false },
  ];

  editProduct(index: number): void {
    this.products[index].editing = true;
  }

  saveProduct(index: number): void {
    this.products[index].editing = false;
    // Aquí podrías llamar a un servicio para actualizar el precio en el backend
    console.log(`Producto actualizado:`, this.products[index]);
  }
}