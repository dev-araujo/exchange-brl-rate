import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: ` <header class="header-card">
    <img (click)="handleEvent()" src="/logo.svg" alt="Action Labs Logo" />
    <div class="title">
      <h1>{{ title }}</h1>
    </div>
  </header>`,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() title = 'BRL EXCHANGE RATE';
  @Output() logoClick = new EventEmitter<void>();

  handleEvent(): void {
    this.logoClick.emit();
  }
}
