import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { TarefaService } from './services/tarefa.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ModeEnum } from './models/mode.enum';
import { Tarefa } from './models/tarefa';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  httpClient = inject(HttpClient);
  title = 'Crud Tarefa';

  tarefaService = inject(TarefaService);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    codigo: [0],
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
  });
  
  ModeEnum = ModeEnum;
  tarefas!: Tarefa[];
  mode = ModeEnum.NON;

  ngOnInit(): void {
    this.obterTarefas();
  }

  private obterTarefas() {
    this.tarefaService.getAllTarefas().subscribe({
      next: (data: any) => {
        console.log(data);
        this.tarefas = data;
      }, error: (err) => console.log(err)
    });
  }

  addNovaTarefa() {
    this.mode = ModeEnum.ADD;
  }

  savarTarefa() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const tarefa = this.form.value as Tarefa;

    if (this.mode === ModeEnum.ADD) {
      tarefa.concluida = false;
      this.tarefaService.addTarefa(tarefa).subscribe(e => {
        this.obterTarefas();
        this.cancelar();
      });
    }
  }

  concluirTarefa(tarefa: Tarefa){
    tarefa.concluida = true;
    this.tarefaService.updateTarefa(tarefa).subscribe(e => {
      this.obterTarefas();
    });
  }
  
  removerTarefa(tarefa: Tarefa) {
    this.tarefaService.deleteTarefa(tarefa).subscribe(e => {
      this.obterTarefas();
    });
  }

  cancelar() {
    this.form.reset();
    this.mode = ModeEnum.NON;
  }
}
