import { Component, OnInit } from '@angular/core';
import { TodoService } from "../todo.service";

// Add an interface for your items
interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  items: Todo[] = [];  // Use the Todo interface instead of any
  error: string = '';
  loading: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading = true;
    this.error = '';

    this.todoService.getItems().subscribe({
      next: (data) => {
        console.log('Received data:', data); // Debug log
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error details:', err); // Detailed error log
        this.error = 'Failed to load items. Please try again.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
