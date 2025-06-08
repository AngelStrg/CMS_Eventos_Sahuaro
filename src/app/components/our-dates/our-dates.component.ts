import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatesService } from '../../services/dates.service';
import { Dates } from '../../models/dates.interface';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-our-dates',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './our-dates.component.html',
  styleUrls: ['./our-dates.component.css']
})
export class OurDatesComponent implements OnInit {
  eventos: Dates[] = [];
  form: FormGroup;

  tiposEvento = ['Cumpleaños', 'Bautizo', 'Primera Comunión', 'Fiesta', 'Evento Empresarial', 'Otro'];
  rangosPersonas = ['1-25', '26-50', '51-75', '76-100', '101+'];
  opcionesAlberca = ['Con alberca', 'Sin alberca'];
  opcionesExtras = ['Inflable Azul', 'Inflable Rosa', 'Palomera', 'Smoothies'];
  coloresMantel = ['#B5818D', '#FEC7B4', '#FFF7D4', '#97E7E1', '#A1EEBD'];

  horasInicioOptions = Array.from({ length: 13 }, (_, i) => i + 8); // 8 a 20
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
      extras: [[]]
    });
  }

  ngOnInit(): void {
    const eventosRef = collection(this.firestore, 'eventos');
    collectionData(eventosRef, { idField: 'id' }).subscribe(data => {
      this.eventos = data as Dates[];
    });

    this.form.get('horaInicio')?.valueChanges.subscribe((hora: number) => {
      this.actualizarHorasExtrasDisponibles(hora);
      this.form.patchValue({ horasExtras: 0 }); // reinicia extras al cambiar hora
      this.actualizarHoraFin();
    });

    this.form.get('horasExtras')?.valueChanges.subscribe(() => this.actualizarHoraFin());
  }

  actualizarHorasExtrasDisponibles(horaInicio: number) {
    if (horaInicio !== null) {
      const horaLimite = 26; // 2 a.m. = 26 (en base 24h extendida)
      const finBase = horaInicio + 6; // 6 horas de base
      const extrasDisponibles = Math.max(0, horaLimite - finBase);
      this.horasExtrasOptions = Array.from({ length: extrasDisponibles + 1 }, (_, i) => i);
    }
  }

  actualizarHoraFin() {
    const horaInicio = +this.form.value.horaInicio;
    const horasExtras = +this.form.value.horasExtras || 0;

    const duracionTotal = 6 + horasExtras;
    let horaFin = horaInicio + duracionTotal;

    if (horaFin >= 24) horaFin -= 24;

    this.horaFinCalculada = this.formatHora(horaFin);
    this.form.patchValue({ horaFin: this.horaFinCalculada });
  }

  formatHora(hora: number): string {
    const periodo = hora >= 12 && hora < 24 ? 'pm' : 'am';
    const hora12 = hora % 12 === 0 ? 12 : hora % 12;
    return `${hora12}:00 ${periodo}`;
  }

  guardarEvento() {
    if (this.form.invalid) {
      alert('Por favor, complete todos los campos requeridos correctamente.');
      return;
    }

    const data = this.form.value;
    data.horaFin = this.horaFinCalculada;

    const eventosRef = collection(this.firestore, 'eventos');
    addDoc(eventosRef, data).then(() => {
      this.form.reset({ horasExtras: 0 });
      this.horaFinCalculada = '';
      this.horasExtrasOptions = [];
    });
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
}
