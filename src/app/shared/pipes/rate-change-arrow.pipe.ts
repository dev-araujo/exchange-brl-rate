import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rateChangeArrow',
  standalone: true,
})
export class RateChangeArrowPipe implements PipeTransform {
  private readonly arrowUpPath = 'icons/arrow-up.svg';
  private readonly arrowDownPath = 'icons/arrow-down.svg';

  transform(value: number | undefined | null): string {
    if (value === undefined || value === null) {
      return ''; 
    }
    
    return value > 0 ? this.arrowUpPath : this.arrowDownPath;
  }
}