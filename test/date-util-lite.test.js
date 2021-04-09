import { DateUtil } from '../lib/index'
import { DateUtil as SimpleDateUtil } from '../lib/lite'

const util = new DateUtil()
const lite = new SimpleDateUtil()

test('isDateOrMoment', () => {
  expect(util.isDateOrMoment(new Date())).toBe(true);
});

test('fromSerialValue', () => {
  expect(JSON.stringify(util.fromSerialValue(40000))).toBe("\"2009-07-06T00:00:00.000Z\"");
});

test('dateToString', () => {
  expect(util.dateToString(new Date())).toBe("2021-04-09");
});

test('isDateOrMoment', () => {
  const t = () => {
    return lite.isDateOrMoment(new Date())
  }
  expect(t).toThrow(TypeError);
});

test('fromSerialValue', () => {
  expect(JSON.stringify(lite.fromSerialValue(40000))).toBe("\"2009-07-06T00:00:00.000Z\"");
});

test('dateToString', () => {
  expect(lite.dateToString(new Date())).toBe("2021-04-09");
});