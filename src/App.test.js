import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App.js';

describe('App tests', () => {
    it('should contain the Star Wars heading', () => {
    render(<App />);
        const heading = screen.getByText(/Star Wars/i);
        expect(heading).toBeInTheDocument()
    });

    it('renders Films link as active on initial page load', () => {
    render(<App />);
        const films = screen.getAllByText(/Films/i);
        expect(films[0]).toBeInTheDocument();
        expect(films[0]).toHaveClass('active');
        expect(films[1]).toBeInTheDocument();
      });
    it('renders loading message in films section', () => {
        render(<App />);
        const loadingMessage = screen.getByText(/Loading.../i);
        expect(loadingMessage).toBeInTheDocument();
      });
    it('renders films table headers', () => {
        render(<App />);
        const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
        expect(nameHeader).toBeInTheDocument();
        const episodeNumber = screen.getByRole('columnheader', { name: /Episode Number/i });
        expect(episodeNumber).toBeInTheDocument();
        const director = screen.getByRole('columnheader', { name: /Director/i });
        expect(director).toBeInTheDocument();
        const releaseDate = screen.getByRole('columnheader', { name: /Release Date/i });
        expect(releaseDate).toBeInTheDocument();
        const producer = screen.getByRole('columnheader', { name: /Producer/i });
        expect(producer).toBeInTheDocument();
      });
});
