import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
   it('should have About text', () => {
        render(<Home />);

        const getElm = screen.getByText('About');

        expect(getElm).toBeInTheDocument();
    });

    it('should containe the text "Lorem ipsum"', () => {
        render(<Home />);

        const getElms = screen.getAllByText(/Welcome to Alpha Corp/i);
        expect(getElms.length).toBeGreaterThan(0);
        expect(getElms[0]).toBeInTheDocument(); // Use getElms[0] to check the first matching element
        
    });

    it('should containe the text "Lorem ipsum"', () => {
        render(<Home />);

        const getElms = screen.getAllByText(/Hello Alpha Corp/i);
        expect(getElms.length).toBeGreaterThan(0);
        expect(getElms[0]).toBeInTheDocument(); // Use getElms[0] to check the first matching element
        
    });
});