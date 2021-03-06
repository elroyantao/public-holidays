/* global describe, it, expect */
import getPublicHolidays from '../src/index'
import moment from 'moment'

describe('valid requests for public holidays', () => {
  it('returns the next public holiday if there are no arguments passed through', () => {
    const result = getPublicHolidays()
    expect(result.length).toEqual(1)
  })

  it('returns the next public holiday if the region is passed through', () => {
    const result = getPublicHolidays(null, 'scotland')
    expect(result.length).toEqual(1)
  })

  it('returns an array of holidays when a valid date range is passed through', () => {
    const augustHolidays = {
      'title': 'Summer bank holiday',
      'date': moment('2019-08-26', 'YYYY-MM-DD'),
      'notes': '',
      'bunting': true
    }
    const result = getPublicHolidays({ start: '2019-08-01', end: '2019-08-31' })
    expect(result.length).toEqual(1)
    expect(result[0]).toEqual(augustHolidays)
  })

  it('returns the date for the correct region when specified', () => {
    const scottishAugustHolidays = {
      'title': 'Summer bank holiday',
      'date': moment('2019-08-05', 'YYYY-MM-DD'),
      'notes': '',
      'bunting': true
    }
    const result = getPublicHolidays({ start: '2019-08-01', end: '2019-08-31' }, 'scotland')
    expect(result.length).toEqual(1)
    expect(result[0]).toEqual(scottishAugustHolidays)
  })

  it('returns all dates within a date range provided, regardles of whether they are in the past', () => {
    const yearHolidays = [
      {
        'title': 'New Year’s Day',
        'date': moment('2019-01-01', 'YYYY-MM-DD'),
        'notes': '',
        'bunting': true
      },
      {
        'title': 'Good Friday',
        'date': moment('2019-04-19', 'YYYY-MM-DD'),
        'notes': '',
        'bunting': false
      },
      {
        'title': 'Easter Monday',
        'date': moment('2019-04-22', 'YYYY-MM-DD'),
        'notes': '',
        'bunting': true
      },
      {
        'title': 'Early May bank holiday',
        'date': moment('2019-05-06', 'YYYY-MM-DD'),
        'notes': '',
        'bunting': true
      },
      {
        'title': 'Spring bank holiday',
        'date': moment('2019-05-27', 'YYYY-MM-DD'),
        'notes': '',
        'bunting': true
      },
      {
        'title': 'Summer bank holiday',
        'date': moment('2019-08-26', 'YYYY-MM-DD'),
        'notes': '',
        'bunting': true
      },
      {
        'title': 'Christmas Day',
        'date': moment('2019-12-25', 'YYYY-MM-DD'),
        'notes': '',
        'bunting': true
      },
      {
        'title': 'Boxing Day',
        'date': moment('2019-12-26', 'YYYY-MM-DD'),
        'notes': '',
        'bunting': true
      }
    ]

    const result = getPublicHolidays({ start: '2019-01-01', end: '2019-12-31' })
    expect(result.length).toEqual(8)
    expect(result).toEqual(yearHolidays)
  })
})

describe('invalid requests for public holidays', () => {
  it(`returns an empty array if there isn't a matching region`, () => {
    const result = getPublicHolidays(null, 'something')
    expect(result.length).toEqual(0)
    expect(result).toEqual([])
  })

  it(`returns an empty array if there isn't an end date in the date range object`, () => {
    const result = getPublicHolidays({ start: '2020-01-01' }, 'northern-ireland')
    expect(result.length).toEqual(0)
    expect(result).toEqual([])
  })

  it(`returns an empty array if there isn't a start date in the date range object`, () => {
    const result = getPublicHolidays({ start: '2020-01-01' }, 'northern-ireland')
    expect(result.length).toEqual(0)
    expect(result).toEqual([])
  })

  it(`returns an empty array if there isn't an end date in the date range object`, () => {
    const result = getPublicHolidays({ end: '2020-01-01' }, 'northern-ireland')
    expect(result.length).toEqual(0)
    expect(result).toEqual([])
  })

  it(`returns an empty array if the date range object has the incorrect keys`, () => {
    const result = getPublicHolidays({ start: 'hello!', end: 'bye!' }, 'northern-ireland')
    expect(result.length).toEqual(0)
    expect(result).toEqual([])
  })

  it(`returns an empty array if there's no date range object`, () => {
    const result = getPublicHolidays('northern-ireland')
    expect(result.length).toEqual(0)
    expect(result).toEqual([])
  })
})
