import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'myDuration',
  pure: true
})
export class DurationPipe  implements PipeTransform {
  public transform(url: string, fullDate: any): any {
      const duration = moment.duration(url, 'seconds');
      const hours = duration.hours();
      const minutes = duration.minutes();

      let result = '';

      if (fullDate === 'full') {
        if (hours > 0) {
            result += moment().localeData().relativeTime(hours, true, ((hours === 1 )  ?  'h' : 'hh'), true) + ' ';
        }
        if  (minutes > 0) {
            result += moment().localeData().relativeTime(minutes, true, ((minutes === 1 )  ?  'm' : 'mm'), true);
        }
        if  (hours === 0  && minutes === 0) {
          result = 'environ ' + moment().localeData().relativeTime(1, true, 'm', true);
        }
      } else if (fullDate === 'short') {
          if (hours > 0) {
            result = hours + 'h' + ((minutes  >  9 )  ?  '' : '0') + minutes;
          } else {
            result = ((minutes > 9)   ?  ' ' : '0') + minutes + ' min';
          }
      } else {
          result = hours + 'h' + ((minutes > 9)   ?  ' ' : '0') + minutes;
      }
      return result;  // moment.duration(url, 'seconds').humanize();
  }
}
