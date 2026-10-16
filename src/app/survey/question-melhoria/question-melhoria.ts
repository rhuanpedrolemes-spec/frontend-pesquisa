import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon';

@Component({
  selector: 'app-question-melhoria',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './question-melhoria.html',
  styleUrl: './question-melhoria.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionMelhoriaComponent implements OnInit {
  @Input() value = '';
  /** Emite o texto digitado (vazio quando o cliente pula). */
  @Output() enviado = new EventEmitter<string>();

  readonly limite = 1000;
  readonly texto = signal('');

  ngOnInit(): void {
    this.texto.set(this.value);
  }

  onInput(evento: Event): void {
    this.texto.set((evento.target as HTMLTextAreaElement).value);
  }

  enviar(): void {
    this.enviado.emit(this.texto().trim());
  }
}
