import React from 'react';
import { render, screen } from '@testing-library/react';
import {AppHeader} from './AppHeader';

test('renders AppHeader AppHeader', () => {
  render(<AppHeader />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
