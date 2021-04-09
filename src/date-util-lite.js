/*
 * Copyright (c) 2020 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

/**
 * Excel serial number cut-off for date. number below this, will be treated as number rather than date
 */
const DATE_SERIAL_NUMBER_CUTOFF = 10000

const DateFormat = {
  YYYYMMDD: 'yyyymmdd',
  ISO8601: 'iso8601',
  AMZ_ISO8601: 'amz-iso8601',
  YYYYMMDDHHMMSSMMM: 'yyyymmddhhmmssmmm',
  'YYYY-MM-DD': 'yyyy-mm-dd',
  EXCEL_SERIAL: 'excel',
}

const formatters = {
  /**
   * Returns a string formatted in iso8601 format (with '-')
   *
   * === Example
   *
   *     // March 31, 2017 20:43:47.314
   *     '2017-03-31T20:43:47.314Z'
   */
  [DateFormat.ISO8601]: (date) => date.toISOString(),

  /**
   * Returns a string formatted like YYYYMMDD.
   *
   * === Example
   *
   *     // March 31, 2017 20:43:47.314
   *     '20170331'
   */
  [DateFormat.YYYYMMDD]: (date) =>
    formatters[DateFormat.ISO8601](date).slice(0, 10).replace(/-/g, ''),

  /**
   * Returns a string formatted like YYYYMMDDHHMMSSMMM.
   *
   * === Example
   *
   *     // March 31, 2017 20:43:47.314
   *     '20170331204347314'
   */
  [DateFormat.YYYYMMDDHHMMSSMMM]: (date) =>
    formatters[DateFormat.ISO8601](date).replace(/[-:.TZ]/g, ''),

  /**
   * Returns a string formatted in iso8601 format (without '-') with
   * 0s for the time of day.
   *
   * === Example
   *
   *     // March 31, 2017 20:43:47.314
   *     '20170331T000000Z'
   */
  [DateFormat.AMZ_ISO8601]: (date) => `${formatters[DateFormat.YYYYMMDD](date)}T000000Z`,

  /**
   * Returns a string formatted like YYYY-MM-DD.
   *
   * === Example
   *
   *     // March 31, 2017 20:43:47.314
   *     '2017-03-31'
   */
  [DateFormat['YYYY-MM-DD']]: (date) => formatters[DateFormat.ISO8601](date).slice(0, 10),

  [DateFormat.EXCEL_SERIAL]: (date) => date.getTime() / 86400000 + 25569,
}

class DateUtil {
  /**
   * Few predefined date formats
   */
  static DateFormat = DateFormat
  /**
   * Returns specified date as formatted string
   *
   * @param {Date} date
   * @param {ISO8601, AMZ_ISO8601, YYYYMMDD, YYYYMMDDHHMMSSMMM} format
   */
  static dateToString(date, format) {
    return formatters[format](date)
  }

  /**
   * Returns current date as formatted string
   *
   * @param {e.g. DateFormat.AMZ_ISO8601} format
   */
  static getCurrentDateString(format) {
    return DateUtil.dateToString(new Date(), format)
  }

  /**
   * Converts Javascript datetime, {@link https://en.wikipedia.org/wiki/Unix_time UNIX Epoch time}
   * based on (milliseconds since 1970-01-01T00:00:00Z) to Microsoft Excel serial number
   * based on (milliseconds since 1900-01-00T00:00:00Z)
   * @param {Date|number|string} date Unix epoch, Javascript datetime
   * @returns Excel serial number of datetime
   */
  static toSerialValue(date) {
    if (!date) return 0
    return formatters[DateFormat.EXCEL_SERIAL](new Date(date))
  }

  /**
   * Converts Excel serial number for datetime to date object
   * @param {*} serial Excel serial number of datetime
   * @returns Date object of datetime
   */
  static fromSerialValue(serial) {
    if (!serial) return 0
    const epoch = (serial - 25569) * 86400000

    const date = new Date(0)
    date.setUTCSeconds(epoch)
    return date
  }

  /**
   * @param {Date|number|string|moment} date Unix epoch, Javascript datetime or moment
   * @returns Excel serial number of days since 1900-01-00T00:00:00Z
   */
  static toSerialDays(date) {
    if (!date) return 0
    const serial = DateUtil.toSerialValue(date)
    // Keep only days (remove values after decimal)
    return Math.floor(serial)
  }

  /**
   * @param serial Excel serial number of days since 1900-01-00T00:00:00Z
   * @returns moment
   */
  static fromSerialDays(serial) {
    if (!serial) return 0
    return DateUtil.fromSerialValue(Math.floor(serial))
  }

  /**
   * Should the specified date be treated a number rather than date
   * @param {Date|number|string|moment} date Unix epoch, Javascript datetime or moment
   */
  static shouldNumberData = (date) => {
    return DateUtil.toSerialDays(date) < DATE_SERIAL_NUMBER_CUTOFF
  }
}

export { DateUtil }
