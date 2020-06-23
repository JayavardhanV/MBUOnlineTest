import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class RemovewhitespacesPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.replace(/^\s+|\s+$/gm, '');
  }
}
