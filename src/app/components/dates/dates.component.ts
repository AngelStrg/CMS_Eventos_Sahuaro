import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dates',
  imports: [FormsModule, CommonModule],
  templateUrl: './dates.component.html',
  styleUrl: './dates.component.css'
})
export class DatesComponent {
eventos = [
    {
      tipo: 'Boda',
      fecha: '2025-06-15',
      hora: '17:00',
      cliente: 'María García',
      estado: 'Confirmado'
    },
    {
      tipo: 'Cumpleaños',
      fecha: '2025-07-02',
      hora: '13:00',
      cliente: 'Luis Pérez',
      estado: 'Pendiente'
    }
  ];

  nuevoEvento = {
    tipo: '',
    fecha: '',
    hora: '',
    cliente: '',
    estado: 'Pendiente'
  };

  editandoIndex: number | null = null;

  agregarEvento() {
    if (
      this.nuevoEvento.tipo.trim() &&
      this.nuevoEvento.fecha &&
      this.nuevoEvento.hora &&
      this.nuevoEvento.cliente.trim()
    ) {
      this.eventos.push({ ...this.nuevoEvento });
      this.nuevoEvento = {
        tipo: '',
        fecha: '',
        hora: '',
        cliente: '',
        estado: 'Pendiente'
      };
    }
  }

  editarEvento(index: number) {
    this.editandoIndex = index;
  }

  guardarEdicion(index: number) {
    this.editandoIndex = null;
  }

  eliminarEvento(index: number) {
    this.eventos.splice(index, 1);
    if (this.editandoIndex === index) this.editandoIndex = null;
  }

  guardarCambios() {
    console.log('Eventos actualizados:', this.eventos);
    alert('Cambios guardados');
  }
}
