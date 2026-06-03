import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders hero heading and skip link', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeTruthy();
    expect(
      screen.getByRole('heading', { level: 1, name: /rishi khadiyar builds/i })
    ).toBeTruthy();
  });
});
