import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Import this instead
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './todo.service';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
    imports: [
        BrowserModule,
        FormsModule
    ],
  providers: [
    TodoService,
    provideHttpClient()  // Add this here instead of HttpClientModule in imports
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
