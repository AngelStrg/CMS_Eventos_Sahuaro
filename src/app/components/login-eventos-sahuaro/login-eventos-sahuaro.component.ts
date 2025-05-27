import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-eventos-sahuaro',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login-eventos-sahuaro.component.html',
  styleUrls: ['./login-eventos-sahuaro.component.css']
})
export class LoginEventosSahuaroComponent {
  errorMessage: string = '';
  successMessage: string = '';

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const { email, password } = form.value;

    if (email === 'admin@sahuaro.com' && password === '123456') {
      this.successMessage = 'Inicio de sesión exitoso';
      this.errorMessage = '';
      console.log('Sesión iniciada correctamente');
      // Aquí puedes redirigir: this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos';
      this.successMessage = '';
    }
  }
}

