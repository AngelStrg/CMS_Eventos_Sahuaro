import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatesService } from '../../services/dates.service';
import { Dates } from '../../models/dates.interface';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { DynamicAddComponent } from '../dynamic-add/dynamic-add.component';
import { AdditionalServicesComponent } from "../additional-services/additional-services.component";

@Component({
  selector: 'app-our-dates',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NavBarComponent, DynamicAddComponent, AdditionalServicesComponent],
  templateUrl: './our-dates.component.html',
  styleUrls: ['./our-dates.component.css']
})
export class OurDatesComponent implements OnInit {
  eventos: Dates[] = [];
  eventosFiltrados: Dates[] = [];
  form: FormGroup;

  tiposEvento = ['Boda', 'Bautizo', 'Cumpleaños', 'Grauación', 'XV años', 'Otro'];
  rangosPersonas = ['1-25', '26-50', '51-80', '81-100', '101-150'];
  opcionesAlberca = ['Con alberca', 'Sin alberca'];
  coloresMantel = ['Azul Rey', 'Azul Cielo', 'Azul Aqua', 'Rosa', 'Durazno', 'Rosa Mexicano', 'Verde', 'Verde Agua', 'Plateado', 'Dorado', 'Amarillo', 'Naranja'];
  estadosDisponibles = ['Confirmado', 'Pendiente', 'Pospuesto'];

  horasInicioOptions = Array.from({ length: 13 }, (_, i) => i + 8);
  horasExtrasOptions: number[] = [];

  horaFinCalculada: string = '';

  constructor(private firestore: Firestore, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fecha: ['', Validators.required],
      personas: ['', Validators.required],
      tipoEvento: ['', Validators.required],
      alberca: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horasExtras: [0],
      horaFin: [''],
      colorMantel: ['', Validators.required],
      extras: [[]],
      estado: ['Pendiente', Validators.required]
    });
  }

  ngOnInit(): void {
    const eventosRef = collection(this.firestore, 'eventos');
    collectionData(eventosRef, { idField: 'id' }).subscribe(data => {
      this.eventos = data as Dates[];
      this.eventosFiltrados = [...this.eventos];
    });

    this.form.get('horaInicio')?.valueChanges.subscribe((hora: number) => {
      this.horaInicio = hora.toString().padStart(2, '0') + ':00';
      this.horasExtrasOptions = this.obtenerHorasExtraDisponibles();
      this.form.patchValue({ horasExtras: 0 });
      this.actualizarHoraFin();
    });

    this.form.get('horasExtras')?.valueChanges.subscribe(() => this.actualizarHoraFin());
  }

  guardarEvento() {
    if (this.form.invalid) {
      alert('Por favor, complete todos los campos requeridos correctamente.');
      return;
    }

    const data = this.form.value;
    data.horaFin = this.horaFin;

    const eventosRef = collection(this.firestore, 'eventos');

    if (this.editando && this.idEditando) {
      const eventoDocRef = doc(this.firestore, `eventos/${this.idEditando}`);
      updateDoc(eventoDocRef, data).then(() => {
        alert('Evento actualizado correctamente');
        this.cancelarEdicion();
      }).catch(err => {
        console.error('Error actualizando evento', err);
      });
    } else {
      addDoc(eventosRef, data).then(() => {
        alert('Evento guardado correctamente');
        this.form.reset({ horasExtras: 0, estado: 'Pendiente' });
        this.horaFin = '';
      }).catch(err => {
        console.error('Error guardando evento', err);
      });
    }
  }

  eliminarEvento(id: string) {
    const eventoRef = doc(this.firestore, `eventos/${id}`);
    deleteDoc(eventoRef);
  }

  onExtraChange(event: any) {
    const value = event.target.value;
    const checked = event.target.checked;
    const extras: string[] = this.form.value.extras || [];

    if (checked && !extras.includes(value)) {
      this.form.patchValue({ extras: [...extras, value] });
    } else if (!checked) {
      this.form.patchValue({ extras: extras.filter(e => e !== value) });
    }
  }

  filtroTexto: string = '';
  filtros = {
    nombre: '',
    fecha: '',
    tipo: '',
    telefono: '',
    correo: '',
    estado: ''
  };

  horaInicio: string = '';
  horasExtras: number = 0;
  horaFin: string = '';
  duracionBase: number = 6;

  actualizarHoraFin() {
    if (!this.horaInicio) {
      this.horaFin = '';
      return;
    }

    const [horaStr] = this.horaInicio.split(':');
    let horaNum = Number(horaStr);
    let totalHoras = this.duracionBase + (this.horasExtras || 0);
    let horaFinNum = horaNum + totalHoras;

    if (horaFinNum > 26) horaFinNum = 26;

    if (horaFinNum <= 23) {
      this.horaFin = `${horaFinNum.toString().padStart(2, '0')}:00`;
    } else {
      const horaReal = horaFinNum - 24;
      this.horaFin = `${horaReal.toString().padStart(2, '0')}:00 (AM siguiente día)`;
    }
  }

  obtenerHorasExtraDisponibles(): number[] {
    if (!this.horaInicio) return [0];

    const maxFin = 26;
    const [horaStr] = this.horaInicio.split(':');
    const horaNum = Number(horaStr);
    const maxHorasExtra = maxFin - (horaNum + this.duracionBase);
    const maxExtra = Math.max(0, maxHorasExtra);

    return Array.from({ length: maxExtra + 1 }, (_, i) => i);
  }

  onHorasExtrasChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.horasExtras = Number(target.value);
    this.actualizarHoraFin();
  }

  editando: boolean = false;
  idEditando: string | null = null;

  editarEvento(evento: Dates) {
    this.editando = true;
    this.idEditando = evento.id || null;

    this.form.patchValue({
      nombre: evento.nombre,
      apellidos: evento.apellidos,
      correo: evento.correo,
      telefono: evento.telefono,
      fecha: evento.fecha,
      personas: evento.personas,
      tipoEvento: evento.tipoEvento,
      alberca: evento.alberca,
      horaInicio: Number(evento.horaInicio),
      horasExtras: evento.horasExtras || 0,
      colorMantel: evento.colorMantel,
      extras: evento.extras || [],
      estado: evento.estado || 'Pendiente'
    });

    this.horaInicio = this.form.value.horaInicio.toString().padStart(2, '0') + ':00';
    this.horasExtras = this.form.value.horasExtras;
    this.actualizarHoraFin();
  }

  cancelarEdicion() {
    this.editando = false;
    this.idEditando = null;
    this.form.reset({ horasExtras: 0, estado: 'Pendiente' });
    this.horaFin = '';
  }

  filtrarEventos() {
    const texto = this.filtroTexto.toLowerCase();

    this.eventosFiltrados = this.eventos.filter(evento => {
      const cumpleFiltros =
        (this.filtros.nombre ? evento.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase()) : true) &&
        (this.filtros.fecha ? evento.fecha.includes(this.filtros.fecha) : true) &&
        (this.filtros.tipo ? evento.tipoEvento.toLowerCase().includes(this.filtros.tipo.toLowerCase()) : true) &&
        (this.filtros.telefono ? evento.telefono.includes(this.filtros.telefono) : true) &&
        (this.filtros.correo ? evento.correo.toLowerCase().includes(this.filtros.correo.toLowerCase()) : true) &&
        (this.filtros.estado ? evento.estado?.toLowerCase().includes(this.filtros.estado.toLowerCase()) : true);

      const cumpleTexto =
        evento.nombre.toLowerCase().includes(texto) ||
        (evento.apellidos?.toLowerCase().includes(texto)) ||
        evento.tipoEvento.toLowerCase().includes(texto) ||
        evento.telefono.toLowerCase().includes(texto) ||
        evento.correo.toLowerCase().includes(texto) ||
        evento.fecha.includes(texto) ||
        (evento.estado?.toLowerCase().includes(texto));

      return cumpleFiltros && (texto === '' || cumpleTexto);
    });
  }

  onCorreoInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  const correo = input.value.toLowerCase();
  this.form.get('correo')?.setValue(correo, { emitEvent: false });
}
}
