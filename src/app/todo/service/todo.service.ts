import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { TodoStatus } from '../model/TodoStatus';
import { Todo } from '../model/todo';
import { LoggerService } from '../../services/logger.service';

let n = 1;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);

  todos : WritableSignal<Todo[]> = signal([]);
  waitingTodos : Signal<Todo[]> = computed(() => this.todos().filter(todo => todo.status === 'waiting'));
  inProgressTodos : Signal<Todo[]> = computed(() => this.todos().filter(todo => todo.status === 'in progress'));
  doneTodos : Signal<Todo[]> = computed(() => this.todos().filter(todo => todo.status === 'done'));

  /**
   * elle retourne la liste des todos
   *
   * @returns Todo[]
   */
  getTodos(): Todo[] {
    return this.todos();
  }
  /**
   * elle retourne la liste des waiting todos
   *
   * @returns Todo[]
   */
  getWaitingTodos(): Todo[] {
    return this.waitingTodos();
  }
/**
   * elle retourne la liste des inProgress todos
   *
   * @returns Todo[]
   */
  getInProgressTodos(): Todo[] {
    return this.inProgressTodos();
  }
/**
   * elle retourne la liste des done todos
   *
   * @returns Todo[]
   */
  getDoneTodos(): Todo[] {
    return this.doneTodos();
  } 

  /**
   *Elle permet d'ajouter un todo
   *
   * @param todo: Todo
   *
   */
  addTodo(todo: Todo): void {
    this.todos.set([...this.todos(), todo]);
  }

  /**
   * Delete le todo s'il existe
   *
   * @param todo: Todo
   * @returns boolean
   */
  deleteTodo(todo: Todo): boolean {
    if (this.todos().includes(todo)) {
      this.todos.set(this.todos().filter((t) => t.id !== todo.id));
      return true;
    }
    return false;
  }

  /**
   * Logger la liste des todos
   */
  logTodos() {
    this.loggerService.logger(this.todos());
    this.loggerService.logger(this.waitingTodos());
  }

  /**
   * Change le status du todo
   *
   * @param todo: Todo
   * @param status: TodoStatus
   */
  changeStatus(todo: Todo, status: TodoStatus) {
    this.todos.set(this.todos().map((t) => (t.id === todo.id ? { ...t, status } : t)));
  }
}