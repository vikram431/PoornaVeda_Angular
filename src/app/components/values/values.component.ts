import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ import this

interface ValueItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-values',
  standalone: true,
  imports: [CommonModule], // ✅ add this
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent {
  values: ValueItem[] = [
    {
      icon: 'fa-leaf',
      title: 'Natural Purity',
      description:
        'Made with the finest natural ingredients, following traditional recipes passed down through generations.',
      color: 'text-secondary'
    },
    {
      icon: 'fa-dharmachakra',
      title: 'Authentic Heritage',
      description:
        'Each product embodies the soul of Indian culture, crafted with respect for our timeless traditions.',
      color: 'text-accent'
    },
    {
      icon: 'fa-om',
      title: 'Sacred Energy',
      description:
        'Infused with the wisdom of Vedic practices, bringing balance and wholeness to modern life.',
      color: 'text-primary'
    },
    {
      icon: 'fa-handshake-angle',
      title: 'Empowering Artisans',
      description:
        'Supporting local craftspeople and sustainable practices that honor our land and people.',
      color: 'text-forest'
    }

  ];
}
