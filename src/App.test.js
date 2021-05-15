import { render, screen } from '@testing-library/react';
import App from './App';
import GroceryBudApp from './Components/Projects/GroceryBud'


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/GROCERY BUD/);
  expect(linkElement).toBeInTheDocument();
});
