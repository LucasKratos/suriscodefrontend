import { render, screen } from '@testing-library/react';
import MarketplaceDashboard from './components/MarketplaceDashboard';

test('renders learn react link', () => {
  render(<MarketplaceDashboard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
