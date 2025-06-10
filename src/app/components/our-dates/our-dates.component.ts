import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatesService } from '../../services/dates.service';
import { Dates } from '../../models/dates.interface';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-our-dates',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,NavBarComponent],
  templateUrl: './our-dates.component.html',
  styleUrls: ['./our-dates.component.css']
})
export class OurDatesComponent implements OnInit {
  eventos: Dates[] = [];
  eventosFiltrados: Dates[] = [];
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

    this.eventosFiltrados = this.eventos;
    
    const eventosRef = collection(this.firestore, 'eventos');
    collectionData(eventosRef, { idField: 'id' }).subscribe(data => {
  this.eventos = data as Dates[];
  this.eventosFiltrados = [...this.eventos];
});

    this.form.get('horaInicio')?.valueChanges.subscribe((hora: number) => {
  this.horaInicio = hora.toString().padStart(2, '0') + ':00';
  this.horasExtrasOptions = this.obtenerHorasExtraDisponibles();
  this.form.patchValue({ horasExtras: 0 }); // reinicia extras al cambiar hora
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
    // Actualizar documento en Firestore
    const eventoDocRef = doc(this.firestore, `eventos/${this.idEditando}`);
    updateDoc(eventoDocRef, data).then(() => {
      alert('Evento actualizado correctamente');
      this.cancelarEdicion();
    }).catch(err => {
      console.error('Error actualizando evento', err);
    });
  } else {
    // Guardar nuevo documento
    addDoc(eventosRef, data).then(() => {
      alert('Evento guardado correctamente');
      this.form.reset({ horasExtras: 0 });
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

  // PROPIEDADES para los filtros (para evitar errores)
  filtroFecha: string = '';
  filtroTipoEvento: string = '';
  filtroCliente: string = '';
  filtroEstado: string = '';

  // Horas de inicio permitidas (de 8 am a 8 pm)
  horasDisponibles: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00'
  ];

  // Variables para selección de horario
  horaInicio: string = '';
  horasExtras: number = 0;
  horaFin: string = '';

  // Base duración del evento en horas
  duracionBase: number = 6;


  // Actualiza la hora de fin cuando cambia la hora de inicio o horas extras
  actualizarHoraFin() {
    if (!this.horaInicio) {
      this.horaFin = '';
      return;
    }

    // Convertir hora de inicio a número (hora)
    const [horaStr] = this.horaInicio.split(':');
    let horaNum = Number(horaStr);

    // Calcular fin sumando duración base + horas extras
    let totalHoras = this.duracionBase + (this.horasExtras || 0);
    let horaFinNum = horaNum + totalHoras;

    // Ajustar horaFinNum para formato 24h (hasta 26 para 2am siguiente día)
    if (horaFinNum > 26) {
      horaFinNum = 26;
    }

    // Convertir horaFinNum a formato hh:mm (ajustando para 24h/2am)
    if (horaFinNum <= 23) {
      this.horaFin = `${horaFinNum.toString().padStart(2, '0')}:00`;
    } else {
      const horaReal = horaFinNum - 24;
      this.horaFin = `${horaReal.toString().padStart(2, '0')}:00 (AM siguiente día)`;
    }
  }

  // Retorna arreglo de horas extra posibles según hora inicio y límites
  obtenerHorasExtraDisponibles(): number[] {
    if (!this.horaInicio) {
      return [0];
    }

    const maxFin = 26; // 2 AM siguiente día en formato 24h + 2
    const [horaStr] = this.horaInicio.split(':');
    const horaNum = Number(horaStr);

    const maxHorasExtra = maxFin - (horaNum + this.duracionBase);

    const maxExtra = Math.max(0, maxHorasExtra);

    // Generar arreglo de 0 hasta maxExtra (ej: [0,1,2])
    const extras = [];
    for (let i = 0; i <= maxExtra; i++) {
      extras.push(i);
    }
    return extras;
  }

  // Controlar cambio de horas extra (recibe string, convertir a número)
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

  // Cargar datos en el formulario
  this.form.patchValue({
    nombre: evento.nombre,
    apellidos: evento.apellidos,
    correo: evento.correo,
    telefono: evento.telefono,
    fecha: evento.fecha,
    personas: evento.personas,
    tipoEvento: evento.tipoEvento,
    alberca: evento.alberca,
    horaInicio: Number(evento.horaInicio),  // Asegúrate que es número
    horasExtras: evento.horasExtras || 0,
    colorMantel: evento.colorMantel,
    extras: evento.extras || []
  });

  // Actualizar horas extra disponibles y hora fin calculada
  this.horaInicio = this.form.value.horaInicio.toString().padStart(2, '0') + ':00';
  this.horasExtras = this.form.value.horasExtras;
  this.actualizarHoraFin();
}

cancelarEdicion() {
  this.editando = false;
  this.idEditando = null;
  this.form.reset({ horasExtras: 0 });
  this.horaFin = '';
}

filtros = {
    nombre: '',
    fecha: '',
    tipo: '',
    telefono: '',
    correo: '',
  };

filtroTexto: string = '';  // para texto del filtro

filtrarEventos() {
  const texto = this.filtroTexto.toLowerCase();

  this.eventosFiltrados = this.eventos.filter(evento => {
    const cumpleFiltros =
      (this.filtros.nombre ? evento.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase()) : true) &&
      (this.filtros.fecha ? evento.fecha.includes(this.filtros.fecha) : true) &&
      (this.filtros.tipo ? evento.tipoEvento.toLowerCase().includes(this.filtros.tipo.toLowerCase()) : true) &&
      (this.filtros.telefono ? evento.telefono.includes(this.filtros.telefono) : true) &&
      (this.filtros.correo ? evento.correo.toLowerCase().includes(this.filtros.correo.toLowerCase()) : true);

    const cumpleTexto =
      evento.nombre.toLowerCase().includes(texto) ||
      (evento.apellidos?.toLowerCase().includes(texto)) ||
      evento.tipoEvento.toLowerCase().includes(texto) ||
      evento.telefono.toLowerCase().includes(texto) ||
      evento.correo.toLowerCase().includes(texto) ||
      evento.fecha.includes(texto);

    return cumpleFiltros && (texto === '' || cumpleTexto);
  });
}

}

