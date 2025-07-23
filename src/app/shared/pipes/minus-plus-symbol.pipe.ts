import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minusPlusSymbol',
  standalone: true,
})
export class MinusPlusSymbolPipe implements PipeTransform {
  transform(value: number | undefined | null): string {
    if (value === undefined || value === null) {
      return '';
    }

    return value > 0 ? '+' : '';
  }
}
