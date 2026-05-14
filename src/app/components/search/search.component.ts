import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isOpen = false;
  searchQuery = '';
  results: any[] = [];
  loading = false;
  private searchSubject = new Subject<string>();

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
      if (isOpen) {
        // Focus input after a short delay to allow animation
        setTimeout(() => {
          document.getElementById('search-input')?.focus();
        }, 300);
      }
    });

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  onQueryChange() {
    this.searchSubject.next(this.searchQuery);
  }

  performSearch(query: string) {
    if (!query || query.length < 2) {
      this.results = [];
      return;
    }

    this.loading = true;
    this.searchService.searchProducts(query).subscribe(results => {
      this.results = results;
      this.loading = false;
    });
  }

  close() {
    this.searchService.close();
    this.searchQuery = '';
    this.results = [];
  }

  onResultClick() {
    this.close();
  }
}
