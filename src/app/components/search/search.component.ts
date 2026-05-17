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
  serverBusy = false;
  private searchSubject = new Subject<string>();
  private searchTimeout: any;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
      if (isOpen) {
        // Focus input after a short delay to allow animation
        setTimeout(() => {
          document.getElementById('search-input')?.focus();
        }, 300);
      } else {
        this.clearTimers();
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
    console.log('Search Component: Query changed to:', this.searchQuery);
    this.searchSubject.next(this.searchQuery);
  }

  performSearch(query: string) {
    console.log('Search Component: Performing search for query:', query);
    this.clearTimers();
    this.serverBusy = false;

    if (!query || query.length < 2) {
      console.log('Search Component: Query too short (< 2 chars), clearing results.');
      this.results = [];
      return;
    }

    this.loading = true;

    // Set 5-second timeout
    this.searchTimeout = setTimeout(() => {
      if (this.loading) {
        console.warn('Search Component: Request timed out after 5 seconds.');
        this.loading = false;
        this.serverBusy = true;
        this.results = [];
      }
    }, 5000);

    console.log('Search Component: Calling SearchService...');
    this.searchService.searchProducts(query).subscribe({
      next: (results) => {
        console.log('Search Component: SearchService returned results:', results);
        this.clearTimers();
        if (!this.serverBusy) {
          this.results = results;
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Search Component: SearchService error:', err);
        this.clearTimers();
        this.loading = false;
        this.results = [];
        this.serverBusy = true;
      }
    });
  }

  private clearTimers() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }
  }

  close() {
    this.searchService.close();
    this.searchQuery = '';
    this.results = [];
    this.serverBusy = false;
    this.clearTimers();
  }

  onResultClick() {
    this.close();
  }
}
