import * as moment from 'moment';

export class Utilities {
    /**
     * Assertion method
     * @param condition condition which must be ok
     * @param message message which will be thrown in exception if condition is not ok
     */
    public static assert(condition: boolean, message: string): boolean {
        if (!condition) {
            throw Error('Assert failed' + (typeof message !== 'undefined' ? ': ' + message : ''));
        }
        return true;
    }

    /**
     * Check if the object is null or undefined
     * @param object
     * @returns {boolean}
     */
    public static isNullOrUndefined(object: any): boolean {
        return ((object === undefined) || (object == null) || (object === 'null'));
    }

    /**
     * Check if the object is null or undefined
     * @param object
     * @returns {boolean}
     */
    public static isNullOrUndefinedOrEmpty(object: any): boolean {
        return (this.isNullOrUndefined(object) || (object === ''));
    }

    /**
     * Parse an ISO date to a moment date object
     * @param object The date
     * @returns {any} The parsed date
     */
    public static parseIsoDate(object: any): any {
        return moment(object, 'YYYYMMDD[T]HHmmss[Z]');
    }
}
