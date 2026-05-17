import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" *ngIf="toastService.toast$ | async as toast">
      <div class="toast" [ngClass]="toast.type">
        <i class="fa-solid" [ngClass]="{
          'fa-circle-check': toast.type === 'success',
          'fa-circle-xmark': toast.type === 'error',
          'fa-circle-info': toast.type === 'info'
        }"></i>
        <span class="message">{{ toast.message }}</span>
        <button class="close-btn" (click)="toastService.clear()">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 9999;
      pointer-events: none;
    }
    .toast {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      background: white;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      min-width: 300px;
      animation: slideIn 0.3s ease-out;
      border-left: 4px solid #3b6b4b;
    }
    .toast.success { border-left-color: #3b6b4b; color: #3b6b4b; }
    .toast.error { border-left-color: #fa5252; color: #fa5252; }
    .toast.info { border-left-color: #4dabf7; color: #4dabf7; }
    
    .message {
      flex: 1;
      font-weight: 600;
      font-size: 0.9375rem;
      color: #333;
    }
    .close-btn {
      background: none;
      border: none;
      color: #adb5bd;
      cursor: pointer;
      padding: 0.25rem;
      transition: color 0.2s;
    }
    .close-btn:hover { color: #495057; }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
