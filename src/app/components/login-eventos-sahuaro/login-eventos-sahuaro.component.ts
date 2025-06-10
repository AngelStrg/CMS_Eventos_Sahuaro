import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login-eventos-sahuaro',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login-eventos-sahuaro.component.html',
  styleUrls: ['./login-eventos-sahuaro.component.css']
})
export class LoginEventosSahuaroComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private auth: Auth // Firebase Auth inyectado
  ) {}

ngOnInit(): void {
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      this.auth.signOut();
    });
  }
}
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const { email, password } = form.value;

    this.authService.login(email, password)
      .then(() => {
        this.successMessage = 'Inicio de sesión exitoso';
        this.errorMessage = '';
        this.router.navigate(['/app-main-page']);
      })
      .catch((error) => {
        this.errorMessage = 'Correo o contraseña incorrectos';
        this.successMessage = '';
        console.error('Error al iniciar sesión:', error.message);
      });
  }
}
