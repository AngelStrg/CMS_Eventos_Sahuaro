import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dates',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
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

  eventosFiltrados = [...this.eventos];

  formularioEvento: FormGroup;

  editandoIndex: number | null = null;

  filtro = {
    tipo: '',
    fecha: '',
    estado: ''
  };

  constructor(private fb: FormBuilder) {
    this.formularioEvento = this.fb.group({
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      cliente: ['', Validators.required],
      estado: ['Pendiente', Validators.required]
    });
  }

  aplicarFiltro() {
    this.eventosFiltrados = this.eventos.filter(evento => {
      const coincideTipo = this.filtro.tipo === '' || evento.tipo.toLowerCase().includes(this.filtro.tipo.toLowerCase());
      const coincideFecha = this.filtro.fecha === '' || evento.fecha === this.filtro.fecha;
      const coincideEstado = this.filtro.estado === '' || evento.estado === this.filtro.estado;
      return coincideTipo && coincideFecha && coincideEstado;
    });
  }

  limpiarFiltro() {
    this.filtro = { tipo: '', fecha: '', estado: '' };
    this.eventosFiltrados = [...this.eventos];
  }

  agregarEvento() {
    if (this.formularioEvento.valid) {
      const nuevoEvento = this.formularioEvento.value;
      this.eventos.push(nuevoEvento);
      this.formularioEvento.reset({ estado: 'Pendiente' });
      this.aplicarFiltro();
    }
  }

  editarEvento(index: number) {
    this.editandoIndex = index;
  }

  guardarEdicion(index: number) {
    this.editandoIndex = null;
    this.aplicarFiltro();
  }

  eliminarEvento(index: number) {
    this.eventos.splice(index, 1);
    if (this.editandoIndex === index) this.editandoIndex = null;
    this.aplicarFiltro();
  }

  guardarCambios() {
    console.log('Eventos actualizados:', this.eventos);
    alert('Cambios guardados');
  }
}
