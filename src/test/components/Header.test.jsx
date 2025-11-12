import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header Component', () => {
  it('should render app title', () => {
    render(<Header error={null} locationLoading={false} />);
    expect(screen.getByText('ECOSELECT')).toBeInTheDocument();
  });

  it('should render tagline', () => {
    render(<Header error={null} locationLoading={false} />);
    expect(screen.getByText('Find Selective Collection Centers Near You')).toBeInTheDocument();
  });

  it('should display error message when error prop is provided', () => {
    const errorMessage = 'Location access denied';
    render(<Header error={errorMessage} locationLoading={false} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should display loading message when locationLoading is true', () => {
    render(<Header error={null} locationLoading={true} />);
    expect(screen.getByText('Getting your location...')).toBeInTheDocument();
  });

  it('should not display error or loading when both are false/null', () => {
    render(<Header error={null} locationLoading={false} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

