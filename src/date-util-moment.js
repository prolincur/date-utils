import moment from 'moment'
import { DateUtil as SimpleDateUtil } from './date-util-lite'

/**
 * An utility class which provide method to query and manipulate date.
 * @namespace DateUtil
 * @author Sourabh Soni <https://prolincur.com>
 */
class DateUtil extends SimpleDateUtil {
  constructor() {
    super()
  }
  /**
   * Few predefined date formats
   */
  static DateFormat = SimpleDateUtil.DateFormat
  /**
   * Checks whether object is a Date or moment object
   * @returns true if object is Date or moment, otherwise false
   */
  isDateOrMoment(date) {
    return moment.isMoment(date) || date instanceof Date
  }

  /**
   * @param date Date or moment
   * @returns moment object or null
   */
  getMoment(date) {
    if (!date) return null

    return moment.isMoment(date) ? date : moment(new Date(date))
  }

  /**
   * @param date Date or moment
   * @param type 'year', 'month', 'day'
   * @see https://momentjs.com/docs/#/manipulating/start-of/
   * @returns Start
   */
  startOf(date, type) {
    if (!date) return null
    return moment(date).startOf(type)
  }

  /**
   * @param date Date or moment
   * @param type 'year', 'month', 'day'
   * @see https://momentjs.com/docs/#/manipulating/end-of/
   * @returns End
   */
  endOf(date, type) {
    if (!date) return null
    return moment(date).endOf(type)
  }

  /**
   * @param date Date or moment
   * @param type 'week', 'month', 'quarter', 'half', 'year'
   * @returns Number value
   * @see https://momentjs.com/docs/#/get-set/week/
   * @see https://momentjs.com/docs/#/get-set/month/
   * @see https://momentjs.com/docs/#/get-set/quarter/
   * @see https://momentjs.com/docs/#/get-set/year/
   * @returns End
   */
  ofYear(date, type) {
    if (!date) return null
    switch (type) {
      case 'week':
        return moment(date).week()
      case 'month':
        return moment(date).month()
      case 'quarter':
        return moment(date).quarter()
      case 'half':
        return moment(date).quarter() > 2 ? 2 : 1
      case 'year':
        return moment(date).year()
      default:
        return null
    }
  }

  /**
   * @param date1 Date or moment
   * @param date2 Date or moment
   * @returns true if date1 are equal to date2
   */
  isSame(date1, date2) {
    if (!date1 && !date2) return true
    return DateUtil.getMoment(date1)?.isSame(DateUtil.getMoment(date2)) || false
  }

  /**
   * @param date1 Date or moment
   * @param date2 Date or moment
   * @returns true if date1 is before date2
   */
  isBefore(date1, date2) {
    return DateUtil.getMoment(date1)?.isBefore(DateUtil.getMoment(date2)) || false
  }

  /**
   * @param date1 Date or moment
   * @param date2 Date or moment
   * @returns true if date1 is after date2
   */
  isAfter(date1, date2) {
    return DateUtil.getMoment(date1)?.isAfter(DateUtil.getMoment(date2)) || false
  }

  /**
   * Compares and returns minimum of two dates. When one of the date is null/undefined, it simplify returns another one.
   * @param date1 Date or moment
   * @param date2 Date or moment
   * @returns minimum of two dates
   */
  min(date1, date2) {
    date1 = DateUtil.getMoment(date1)
    date2 = DateUtil.getMoment(date2)
    if (!date1) return date2
    if (!date2) return date1

    return moment.min(date1, date2)
  }

  /**
   * Compares and returns maximum of two dates. When one of the date is null/undefined, it simplify returns another one.
   * @param date1 Date or moment
   * @param date2 Date or moment
   * @returns maxiumum of two dates
   */
  max(date1, date2) {
    date1 = DateUtil.getMoment(date1)
    date2 = DateUtil.getMoment(date2)
    if (!date1) return date2
    if (!date2) return date1

    return moment.max(date1, date2)
  }

  /**
   * Converts Javascript datetime, {@link https://en.wikipedia.org/wiki/Unix_time UNIX Epoch time}
   * based on (milliseconds since 1970-01-01T00:00:00Z) or moment to Microsoft Excel serial number
   * based on (milliseconds since 1900-01-00T00:00:00Z)
   * @param {Date|number|string|moment} date Unix epoch, Javascript datetime or moment
   * @returns Excel serial number of datetime
   */
  toSerialValue(date) {
    if (!date) return 0
    const epoch = moment.isMoment(date) ? date.valueOf() : new Date(date).getTime()
    return epoch / 86400000 + 25569
  }

  /**
   * Converts Excel serial number for datetime to moment object
   * @param {*} serial Excel serial number of datetime
   * @returns Moment object of datetime
   */
  fromSerialValue(serial) {
    if (!serial) return 0
    const epoch = (serial - 25569) * 86400000
    return moment(epoch)
  }
}

export { DateUtil }
