import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'myFileSize',
  pure: true
})
export class FileSizePipe  implements PipeTransform {

    constructor(private translateService: TranslateService) {

    }
    /**
     * Function that converts file size to human readable string
     * @param bytesStr {Number} The file size in bytes
     * @param si {Boolean} true to use classic display (Ko, Mo) or false to use (Kio, Mio)
     * @param useTranslationformat {Boolean} true to send {value: '14.6', units: 'units.mio' } or false to have a string representaiton (14.6 Mio)
     * @return The file size in human readable string format
     */
    public transform(bytesStr: string, si: any, useTranslationformat: any): any {
        let bytes = +bytesStr;
        const thresh = (si === true) ? 1000 : 1024;
        let units : any;
        let value : any;

        if (Math.abs(bytes) < thresh) {
            value = bytes;
            units = 'b';
        } else {
            const allUnits = (si === true)
                ? ['kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']
                : ['Kib', 'Mib', 'Gib', 'Tib', 'Pib', 'Eib', 'Zib', 'Yib'];

            let u = -1;
            do {
                bytes /= thresh;
                ++u;
            } while (Math.abs(bytes) >= thresh && u < allUnits.length - 1);

            value = bytes.toFixed(1);
            units = allUnits[u];
        }
        if (useTranslationformat === true) {
            return new Promise<any>( (resolve, reject) => {
                this.translateService.get('units.' + units.toLowerCase()).subscribe( (translatedUnits: string) => {
                    const result = { value, units: translatedUnits  };
                    console.log(result);
                    resolve(result);
                }, (reason?: any) => reject);
            });
        } else {
            return value + ' ' + units;
        }
    }
}
