// persian-date.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-jalaali';  // ← مهم: بدون * as

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';
    return moment(value).format('jYYYY/jMM/jDD');
  }
}
