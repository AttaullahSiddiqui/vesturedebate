import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortby',
})
export class SortbyPipe implements PipeTransform {
  transform(value: any, args?: Number): any {
    return value.sort((a: any, b: any) => {
      return a.value.sortNo - b.value.sortNo;
    });
  }
}
