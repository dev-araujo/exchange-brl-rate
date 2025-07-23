import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';

const COMPONENTS = [FooterComponent, HeaderComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...COMPONENTS],
  template: `
    <app-header (logoClick)="handleRedirectURL()" />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
  styleUrl: './app.scss',
})
export class AppComponent {
  title = 'exchange-brl-rate';

  router = inject(Router);

  handleRedirectURL(): void {
    this.router.navigate(['/']);
  }
}
