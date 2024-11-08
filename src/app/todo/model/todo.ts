import { TodoStatus } from './TodoStatus'; // Assurez-vous que TodoStatus est défini comme un type séparé
let idGenerated = 1;

export class Todo {
  id: number;
  status: TodoStatus;

  constructor(public name = '', public content = '', status: TodoStatus = 'waiting') {
    this.id = idGenerated++; 
    this.status = status;   }
}
