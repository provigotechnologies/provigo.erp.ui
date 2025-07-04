import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service'; // Adjust path if needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cigt.erp.ui';

  constructor(private authService: AuthService) {}

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    const user = this.authService.getCurrentUser();
    const userId = user?.id;

    if (userId) {
      navigator.sendBeacon(
        'https://localhost:7082/log-logout',
        JSON.stringify({ userId })
      );
    }
  }
}
