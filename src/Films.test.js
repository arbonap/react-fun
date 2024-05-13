import { render, screen } from '@testing-library/react';
import React from 'react';
import Films from './pages/Films.js';
import { MemoryRouter as Router } from 'react-router-dom';

it('renders Films link as active on initial page load', () => {
  render(
    <Router>
      <Films />
    </Router>);
      const films = screen.getAllByText(/Films/i);
      expect(films[0]).toBeInTheDocument();
      expect(films[0]).toHaveClass('active');
      expect(films[1]).toBeInTheDocument();
    });
