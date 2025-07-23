import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: ` <footer class="footer">
    <span>{{ title }}</span>
  </footer>`,
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() title = 'Copyright 2022 - Action Labs';
}
