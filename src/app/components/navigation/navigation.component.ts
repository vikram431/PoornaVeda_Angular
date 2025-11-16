import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports:[CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() cartItemsCount = 0;
  @Output() cartClick = new EventEmitter<void>();

  isLoggedIn = false; // replace with backend auth check later
  mobileMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onCartClick(): void {
    this.cartClick.emit();
  }

  signOut(): void {
    this.isLoggedIn = false;
    alert('Signed out');
    // Later: Call your backend logout API
  }

  navigate(path: string): void {
    console.log(path);
    this.router.navigate([path]);
    this.mobileMenuOpen = false;
  }
}
