import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/items';  // Adjust the API endpoint as necessary

  constructor(private http: HttpClient) {}

  // Fetches all to-do items from the API
  getItems(): Observable<any[]> {  // You can use any[] if you don't have a model
    return this.http.get<any[]>(this.apiUrl);
  }

  // Optionally, you can add more methods to manage items
  // Create a new to-do item
  addItem(item: any): Observable<any> {  // You can replace 'any' with your item model if defined
    return this.http.post<any>(this.apiUrl, item);
  }

  // Update an existing to-do item
  updateItem(item: any): Observable<any> {  // Same here
    return this.http.put<any>(`${this.apiUrl}/${item.id}`, item);  // Assuming 'item' has an 'id' property
  }

  // Delete a to-do item by ID
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
