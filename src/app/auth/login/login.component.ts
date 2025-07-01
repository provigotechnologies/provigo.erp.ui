import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log("button clicked")
      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']); // Replace with shell component route
          } else {
            this.errorMessage = 'Invalid credentials';
          }
        },
        error: () => {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in both fields.';
    }
  }
}
