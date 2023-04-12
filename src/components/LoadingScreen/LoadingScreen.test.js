import { render, screen } from '@testing-library/react';
import LoadingScreen  from './';

describe('LoadingScreen', () => {
  it('renders', () => {
    render(<LoadingScreen />);
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });
});