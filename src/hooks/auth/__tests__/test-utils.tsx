
import React from 'react';

// Mock implementation of React Testing Library's renderHook
export function renderHook<TResult>(hook: () => TResult) {
  let result: { current: TResult } = { current: null as unknown as TResult };
  
  function TestComponent() {
    result.current = hook();
    return null;
  }
  
  React.createElement(TestComponent, {});
  
  return { result, rerender: () => {} };
}

// Mock implementation of act
export function act(callback: () => void | Promise<void>) {
  callback();
}
