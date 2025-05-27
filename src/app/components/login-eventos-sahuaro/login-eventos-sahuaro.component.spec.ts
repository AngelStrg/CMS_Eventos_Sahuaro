import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEventosSahuaroComponent } from './login-eventos-sahuaro.component';

describe('LoginEventosSahuaroComponent', () => {
  let component: LoginEventosSahuaroComponent;
  let fixture: ComponentFixture<LoginEventosSahuaroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEventosSahuaroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEventosSahuaroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
