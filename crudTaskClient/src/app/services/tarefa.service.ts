import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private http = inject(HttpClient);
  private url = 'https://localhost:7071/api/tarefa/';
  
  constructor() { }

  getAllTarefas(){
    return this.http.get<Tarefa[]>(this.url);
  }

  addTarefa(tarefa: Tarefa) {
    return this.http.post(this.url,tarefa);
  }
  
  deleteTarefa(tarefa: Tarefa) {
    return this.http.delete(this.url+tarefa.codigo);
  }

  updateTarefa(tarefa: Tarefa) {
    return this.http.put(this.url+tarefa.codigo,tarefa);
  }

}
