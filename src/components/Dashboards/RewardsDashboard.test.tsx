import React from 'react';
import { render, screen } from '@testing-library/react';
import {RewardsDashboard} from './RewardsDashboard';

test('renders RewardsDashboard Table', () => {
  render(<RewardsDashboard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
