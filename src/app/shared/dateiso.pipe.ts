import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { Utilities } from './utilities';

@Pipe({
  name: 'myDateiso',
  pure: true
})
export class DateIsoPipe  implements PipeTransform {
  public transform(input: string, displayFormat: any): any {
      const date = Utilities.parseIsoDate(input);
      return date.format(displayFormat);
  }
}
