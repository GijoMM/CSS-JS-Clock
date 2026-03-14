// Manual DOM Mocks
const mockSecondHand = { style: { transform: '' } };
const mockMinutesHand = { style: { transform: '' } };
const mockHoursHand = { style: { transform: '' } };
const mockHandElements = [
  { addEventListener: jest.fn() },
  { addEventListener: jest.fn() },
  { addEventListener: jest.fn() },
];

global.document = {
  querySelector: jest.fn((selector) => {
    switch (selector) {
      case '.second-hand':
        return mockSecondHand;
      case '.min-hand':
        return mockMinutesHand;
      case '.hour-hand':
        return mockHoursHand;
      default:
        return null;
    }
  }),
  querySelectorAll: jest.fn((selector) => {
    if (selector === '.hand') return mockHandElements;
    return [];
  }),
};

// Mock Date object to return deterministic times
const mockDate = {
  getSeconds: () => 45,
  getMinutes: () => 30,
  getHours: () => 14,
};

const OriginalDate = global.Date;

beforeAll(() => {
  global.Date = class {
    constructor() {
      return mockDate; // Always return the mock date instance
    }
  };
});

afterAll(() => {
  global.Date = OriginalDate;
});

const { setDate } = require('./clock');

describe('setDate', () => {
  it('correctly sets transform rotations based on time', () => {
    // Expected logic based on time '14:30:45':
    // seconds: 45 -> ((45 / 60) * 360) + 90 = 360
    // minutes: 30 -> ((30 / 60) * 360) + 90 = 270
    // hours: 14 -> ((14 / 12) * 360) + 90 = 510

    setDate();

    expect(mockSecondHand.style.transform).toBe('rotate(360deg)');
    expect(mockMinutesHand.style.transform).toBe('rotate(270deg)');
    expect(mockHoursHand.style.transform).toBe('rotate(510deg)');
  });
});
