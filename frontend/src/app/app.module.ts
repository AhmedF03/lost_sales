import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Import this instead
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TodoService,
    provideHttpClient()  // Add this here instead of HttpClientModule in imports
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
