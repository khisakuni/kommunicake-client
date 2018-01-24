import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mockLocalStorage } from './test-helpers'

beforeEach(() => {
  mockLocalStorage()
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
