import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
  logoIcon = '/logo-icon.png';

  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}

