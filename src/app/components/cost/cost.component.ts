import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  price: number;
  price1: number;
  editing: boolean;
  editing1: boolean;
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
    { name: '5 a 25', price: 100, price1: 100, editing: false, editing1: false },
    { name: '26 a 50', price: 200, price1: 100, editing: false, editing1: false },
    { name: '51 a 80', price: 300, price1: 100, editing: false, editing1: false },
    { name: '81 a 100', price: 300, price1: 100, editing: false, editing1: false },
    { name: '101 a 150', price: 300, price1: 100, editing: false, editing1: false },
  ];

  editProduct(index: number): void {
    this.products[index].editing = true;
  }

  saveProduct(index: number): void {
    this.products[index].editing = false;
    // Aquí podrías llamar a un servicio para actualizar el precio en el backend
    console.log(`Producto actualizado:`, this.products[index]);
  }

  editProduct1(index: number): void {
    this.products[index].editing1 = true;
  }

  saveProduct1(index: number): void {
    this.products[index].editing1 = false;
    // Aquí podrías llamar a un servicio para actualizar el precio en el backend
    console.log(`Producto actualizado:`, this.products[index]);
  }

}