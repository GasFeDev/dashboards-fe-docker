import React from 'react';
import { render, screen } from '@testing-library/react';
import {AppFooter} from './AppFooter';

test('renders AppFooter Table', () => {
  render(<AppFooter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
