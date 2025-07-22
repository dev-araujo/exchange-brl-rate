import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rateChangeArrow',
  standalone: true,
})
export class RateChangeArrowPipe implements PipeTransform {
  transform(value: number | undefined | null): string {
    if (value === undefined || value === null) {
      return '';
    }
    return value > 0 ? '▲' : '▼';
  }
}