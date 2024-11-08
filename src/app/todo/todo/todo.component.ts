import { Component, inject } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoStatus } from '../model/TodoStatus';
import { TodoService } from '../service/todo.service';

import { FormsModule } from '@angular/forms';
import { RainbowDirective } from 'src/app/directives/rainbow.directive';
@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    providers: [TodoService],
    standalone: true,
    imports: [FormsModule, RainbowDirective],
})
export class TodoComponent {
  private todoService = inject(TodoService);
  todo = new Todo();
  constructor() {
  }
  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
    //this.todoService.logTodos();
    //console.log(this.waitingTodos)
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
    //this.todoService.logTodos();
  }

  changeStatus(todo: Todo, status: TodoStatus) {
    this.todoService.changeStatus(todo, status);
    this.todoService.logTodos();
  }

  getWaitingTodos(){
    return this.todoService.getWaitingTodos();
  }

  getInProgressTodos(){
    return this.todoService.getInProgressTodos();
  }
  getDoneTodos(){
    return this.todoService.getDoneTodos();
  }
}