import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders site shell', () => {
  render(<App />);
  const mainElement = document.querySelector('main');
  expect(mainElement).toBeInTheDocument();
  expect(screen.queryByText(/learn react/i)).not.toBeInTheDocument();
});
