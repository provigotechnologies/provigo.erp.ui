import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service'; // adjust path

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) {}

 onLogout() {
  const confirmLogout = window.confirm('Are you sure you want to log out this user?');
  if (!confirmLogout) return; // If user cancels, stop here

  console.log('Logout clicked');

  const user = this.authService.getCurrentUser();
  const userId = user?.id;

  console.log('Logout clicked:', user);
  console.log('Sending userId:', userId);

  if (userId) {
    this.authService.logLogout(userId).subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Failed to log logout event:', err);
        this.router.navigate(['']);
      }
    });
  } else {
    this.router.navigate(['']);
  }
}


}
