import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatesService } from '../../services/dates.service';
import { Dates } from '../../models/dates.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-our-dates',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './our-dates.component.html',
  styleUrls: ['./our-dates.component.css']
})
export class OurDatesComponent implements OnInit {
  dates: Dates[] = [];
  filteredDates: Dates[] = [];

  newForm: FormGroup;
  updateForm: FormGroup;
  selectedDateId: string | null = null;

  filtro = {
    event: '',
    date: '',
    hour: '',
    client: '',
    status: ''
  };

  constructor(
    private fb: FormBuilder,
    private datesService: DatesService
  ) {
    this.newForm = this.fb.group({
      event: ['', Validators.required],
      date: ['', Validators.required],
      hora: ['', Validators.required],
      client: ['', Validators.required],
      status: ['Pendiente', Validators.required]
    });

    this.updateForm = this.fb.group({
      event: ['', Validators.required],
      date: ['', Validators.required],
      hora: ['', Validators.required],
      client: ['', Validators.required],
      status: ['Pendiente', Validators.required]
    });
  }

  ngOnInit(): void {
    this.datesService.getDate().subscribe((data: any) => {
      this.dates = data.map((item: any) => ({
        id: item.id,
        event: item.event,
        date: item.date,
        hour: item.hora,
        client: item.client,
        status: item.status
      }));
      this.filteredDates = [...this.dates];
    });
  }

  aplicarFiltro() {
  this.filteredDates = this.dates.filter(date => {
    return (
      (this.filtro.event === '' || date.event.toLowerCase().includes(this.filtro.event.toLowerCase())) &&
      (this.filtro.date === '' || date.date === this.filtro.date) &&
      (this.filtro.hour === '' || date.hour === this.filtro.hour) &&
      (this.filtro.client === '' || date.client.toLowerCase().includes(this.filtro.client.toLowerCase())) &&
      (this.filtro.status === '' || date.status === this.filtro.status)
    );
  });
}

  limpiarFiltro() {
    this.filtro = {
      event: '',
      date: '',
      hour: '',
      client: '',
      status: ''
    };
    this.filteredDates = [...this.dates];
  }

  async agregarEvento() {
    if (this.newForm.valid) {
      const nuevo = this.newForm.value;
      await this.datesService.AddDate(nuevo);
      this.newForm.reset({ status: 'Pendiente' });
    }
  }

  cargarParaEditar(evento: Dates) {
    this.selectedDateId = evento.id!;
    this.updateForm.patchValue({
      event: evento.event,
      date: evento.date,
      hora: evento.hour,
      client: evento.client,
      status: evento.status
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  async actualizarEvento() {
    if (this.selectedDateId && this.updateForm.valid) {
      const actualizado = this.updateForm.value;
      await this.datesService.updateDate(this.selectedDateId, actualizado);
      this.selectedDateId = null;
      this.updateForm.reset({ status: 'Pendiente' });
    }
  }

async deleteDate(id: string) {
  if (confirm('¿Seguro que quieres eliminar este evento?')) {
    try {
      await this.datesService.deleteDate(id);
      // Elimina localmente para actualizar la UI
      this.dates = this.dates.filter(date => date.id !== id);
      this.aplicarFiltro();
      if (this.selectedDateId === id) {
        this.selectedDateId = null;
        this.updateForm.reset();
      }
      alert('Evento eliminado correctamente');
    } catch (error) {
      console.error('Error eliminando el evento:', error);
      alert('Error eliminando el evento');
    }
  }
}
}
