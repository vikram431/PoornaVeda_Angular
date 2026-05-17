import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost {
  id?: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
  content?: string;
}

export interface PaginatedBlogs {
  content: BlogPost[];
  pageable: any;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8080/blogs';

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/all`);
  }

  getBlogsPaginated(page: number, size: number): Observable<PaginatedBlogs> {
    return this.http.get<PaginatedBlogs>(`${this.apiUrl}/paginated?page=${page}&size=${size}`);
  }

  getBlogById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }
}
