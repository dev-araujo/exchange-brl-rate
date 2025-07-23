import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moreLess',
  standalone: true,
})
export class MoreLessPipe implements PipeTransform {
  private readonly plusIconPath = 'icons/plus.svg';
  private readonly minusIconPath = 'icons/less.svg';


  transform(value: boolean | undefined | null): string {
    return value ? this.minusIconPath : this.plusIconPath;
  }
}
