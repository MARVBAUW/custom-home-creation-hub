// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  } as Response)
);

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  length: 0,
};
global.localStorage = localStorageMock as unknown as Storage;

// Mock window.location
const location = {
  pathname: '/',
  assign: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
  toString: jest.fn(),
};
Object.defineProperty(window, 'location', {
  value: location,
  writable: true,
});

// Mock console methods to keep tests cleaner
global.console = {
  ...console,
  // Uncomment to suppress console.log during tests
  // log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

// Create a mock jest object if it doesn't exist
if (!global.jest) {
  global.jest = {
    fn: () => jest.fn(),
    spyOn: (object, method) => jest.spyOn(object, method),
  };
}

afterEach(() => {
  jest.clearAllMocks();
});
