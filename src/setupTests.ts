
// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Define global testing types for TypeScript
declare global {
  // Define a minimal Jest-like interface
  const jest: {
    fn: (implementation?: any) => any;
    spyOn: (object: any, method: string) => any;
    clearAllMocks: () => void;
    restoreAllMocks: () => void;
  };

  // Testing functions
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => void | Promise<void>): void;
  function beforeEach(fn: () => void): void;
  function afterEach(fn: () => void): void;
  function expect(actual: any): {
    toBe: (expected: any) => void;
    toEqual: (expected: any) => void;
    toBeNull: () => void;
    toThrow: (expected?: any) => void;
    toHaveBeenCalled: () => void;
    toHaveBeenCalledWith: (...args: any[]) => void;
    toContain: (expected: any) => void;
  };
}

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
if (typeof jest === 'undefined') {
  // Create a mock function for jest.fn
  const mockFn = function() {
    return function() {};
  };
  
  // Create a mock function for jest.spyOn
  const mockSpyOn = function() {
    return function() {};
  };
  
  // Assign the mock jest object to window
  (window as any).jest = {
    fn: mockFn,
    spyOn: mockSpyOn,
    clearAllMocks: () => {},
    restoreAllMocks: () => {},
  };
}

// Add basic test functions if they don't exist
if (typeof describe !== 'function') {
  (global as any).describe = (name: string, fn: () => void) => { fn(); };
}
if (typeof it !== 'function') {
  (global as any).it = (name: string, fn: () => void) => { fn(); };
}
if (typeof beforeEach !== 'function') {
  (global as any).beforeEach = (fn: () => void) => { fn(); };
}
if (typeof afterEach !== 'function') {
  (global as any).afterEach = (fn: () => void) => { fn(); };
}
if (typeof expect !== 'function') {
  (global as any).expect = (actual: any) => ({
    toBe: (expected: any) => {},
    toEqual: (expected: any) => {},
    toBeNull: () => {},
    toThrow: (expected?: any) => {},
    toHaveBeenCalled: () => {},
    toHaveBeenCalledWith: (...args: any[]) => {},
    toContain: (expected: any) => {},
  });
}

afterEach(() => {
  if (typeof jest !== 'undefined') {
    jest.clearAllMocks();
  }
});
