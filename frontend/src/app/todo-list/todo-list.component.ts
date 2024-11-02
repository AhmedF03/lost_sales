import { Component, OnInit } from '@angular/core';
import { TodoService } from "../todo.service";
import {take, tap} from "rxjs";

// Add an interface for your items
interface Todo {
  id: number;
  description: string;
  count:number;
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
  existingItem: Todo | null = null;
  newItem: Todo = {id:0,description:'',count:1}

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

  incrementItemCount(item: Todo): void {
    this.todoService.incrementCount(item.id).subscribe(updatedItem => {
      item.count = updatedItem.count;
    });
  }

  decrementItemCount(item: Todo): void {
    if (item.count ==1){
      this.deleteItem(item.id);
    }
    else {
     this.todoService.decrementCout(item.id).subscribe(updatedItem => {
      item.count = updatedItem.count;
    });
    }
  }

  deleteItem(id: number): void {
    this.todoService.deleteItem(id).pipe(
      tap({
        next: () => this.loadItems(),
        error: () => this.error = 'Error deleting item'
      }),
      take(1)
    ).subscribe();
    if(this.existingItem){
      this.existingItem = null;
    }
  }

  checkExistingItem(): void {
    this.existingItem = this.items.find(item => item.description === this.newItem.description) || null;
  }

  onSubmit() {
    this.checkExistingItem();
    const exists= this.items.some(item => item.description === this.newItem.description);
    if (exists) {
      //this.error = 'Item with this description already exists.';
      return;  // Exit the function if a duplicate is found
    }
    this.todoService.addItem(this.newItem).subscribe(
        (createdItem) => {
          this.newItem = { id:0, description: '', count: 1 };
          this.loadItems();
        }
    )
  }
  onUpdate(item: Todo): void {
    this.todoService.updateItem(item).subscribe(
      (updatedItem) => {
        // Successfully updated, you might want to update your local items array
        const index = this.items.findIndex(i => i.id === updatedItem.id);
        if (index !== -1) {
          this.items[index] = updatedItem; // Update the local item with the updated data
        }
        this.error = ''; // Clear any previous error messages
      },
      (error) => {
        this.error = 'Error updating item'; // Handle potential errors
      }
    );
  }

}
